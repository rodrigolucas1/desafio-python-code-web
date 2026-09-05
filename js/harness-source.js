/* Harness Python: código executado dentro do sandbox (Pyodide/WebAssembly).
   Contém:
   - Guarda AST que bloqueia importações e chamadas perigosas
   - Função que executa o código do aluno com entrada/saída controladas
   - Captura de erros com linha e mensagem
   Este código é compartilhado entre o worker (navegador) e os testes (Node).
*/

export const HARNESS_PY = String.raw`
import ast, io, sys, json, traceback, builtins

MODULOS_PERMITIDOS = {"math", "random", "string", "json", "collections",
                      "statistics", "itertools", "functools", "decimal",
                      "fractions", "re", "datetime"}

CHAMADAS_BLOQUEADAS = {"open", "eval", "exec", "compile", "__import__",
                       "globals", "locals", "vars", "getattr", "setattr",
                       "delattr", "exit", "quit", "help", "breakpoint",
                       "memoryview", "input_hack"}

NOMES_BLOQUEADOS = {"_DesafioRunner"}

def _guarda_codigo(code):
    """Verifica o código do aluno antes de montar e executar."""
    try:
        tree = ast.parse(code)
    except SyntaxError:
        raise
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for nome in node.names:
                mod = nome.name.split(".")[0]
                if mod == "builtins" or mod in NOMES_BLOQUEADOS:
                    return "Importação não permitida: " + mod
                if mod not in MODULOS_PERMITIDOS:
                    return "Este módulo não pode ser importado aqui: " + mod
        elif isinstance(node, ast.ImportFrom):
            if node.module is not None:
                mod = node.module.split(".")[0]
                if mod == "builtins" or mod in NOMES_BLOQUEADOS:
                    return "Importação não permitida: " + mod
                if mod not in MODULOS_PERMITIDOS:
                    return "Este módulo não pode ser importado aqui: " + mod
            for alias in node.names:
                if alias.name.startswith("__"):
                    return "Importação não permitida: " + alias.name
        elif isinstance(node, ast.Call):
            alvo = None
            if isinstance(node.func, ast.Name):
                alvo = node.func.id
            elif isinstance(node.func, ast.Attribute):
                if isinstance(node.func.value, ast.Name) and node.func.value.id not in ("math", "random", "string", "re", "decimal", "fractions", "statistics", "functools", "collections", "itertools"):
                    alvo = node.func.attr
            if alvo in CHAMADAS_BLOQUEADAS:
                return "Esta operação não é permitida no desafio: " + alvo
        elif isinstance(node, ast.Attribute):
            if node.attr.startswith("__") and node.attr.endswith("__"):
                return "Acesso interno do Python não permitido."
        elif isinstance(node, ast.Name):
            if node.id in NOMES_BLOQUEADOS:
                return "Nome reservado não permitido."
    return None

class _EntradaControlada:
    """Simula o stdin com uma lista de valores para input()."""
    def __init__(self, linhas):
        self._dados = list(linhas)
        self.nome = "<stdin>"

    def readline(self):
        if not self._dados:
            raise EOFError("fim da entrada")
        return self._dados.pop(0) + "\n"

    def read(self, tamanho=-1):
        if not self._dados:
            return ""
        resto = "\n".join(self._dados) + "\n"
        if tamanho == -1 or tamanho >= len(resto):
            self._dados = []
            return resto
        saida = resto[:tamanho]
        self._dados = resto[tamanho:].split("\n")
        if self._dados and self._dados[-1] == "":
            self._dados.pop()
        return saida

    def isatty(self):
        return False

def _executar_codigo(code, entradas):
    """Executa o código do aluno e retorna saída/erro de forma isolada."""
    saida = io.StringIO()
    stderr = io.StringIO()
    try:
        problema = _guarda_codigo(code)
    except SyntaxError as se:
        return {"ok": False, "output": "", "error": se.msg,
                "errorType": "SyntaxError", "linha": se.lineno}
    if problema is not None:
        return {"ok": False, "output": "", "error": problema,
                "errorType": "Bloqueio", "linha": None}
    sys_stdout_original = sys.stdout
    sys_stderr_original = sys.stderr
    sys_stdin_original = sys.stdin
    builtins_input = builtins.input
    try:
        sys.stdin = _EntradaControlada(entradas)
        sys.stdout = saida
        sys.stderr = stderr
        builtins.input = lambda prompt="": builtins_input()
        namespace_exec = {"__name__": "__main__", "__builtins__": __builtins__}
        try:
            codigo_compilado = compile(code, "<aluno>", "exec")
        except SyntaxError as se:
            return {"ok": False, "output": saida.getvalue(), "error": str(se.msg),
                    "errorType": "SyntaxError", "linha": se.lineno}
        except (OverflowError, MemoryError) as e:
            return {"ok": False, "output": saida.getvalue(),
                    "error": "Erro ao compilar o código.", "errorType": type(e).__name__,
                    "linha": None}
        try:
            exec(codigo_compilado, namespace_exec)
        except SystemExit as se:
            return {"ok": False, "output": saida.getvalue(),
                    "error": "O programa terminou com SystemExit.", "errorType": "SystemExit",
                    "linha": None}
        except BaseException as e:
            trad = traceback.format_exception(type(e), e, e.__traceback__)
            texto = "".join(trad)
            linha = None
            import re
            m = re.findall(r'File "<aluno>", line (\\d+)', texto)
            if m:
                linha = int(m[-1])
            return {"ok": False, "output": saida.getvalue(), "error": texto,
                    "errorType": type(e).__name__, "linha": linha}
        return {"ok": True, "output": saida.getvalue(), "error": None,
                "errorType": None, "linha": None}
    finally:
        sys.stdout = sys_stdout_original
        sys.stderr = sys_stderr_original
        sys.stdin = sys_stdin_original
        builtins.input = builtins_input

def desafio_run_batch(code, lista_entradas):
    """Executa o código uma vez para cada lista de entradas."""
    resultados = []
    for entradas in lista_entradas:
        try:
            entradas = list(entradas)
        except Exception:
            entradas = []
        resultados.append(_executar_codigo(code, entradas))
    return resultados
`;