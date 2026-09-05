/* DESAFIO PYTHON CODE - Banco de Desafios
   Estrutura organizada que permite adicionar infinitos desafios
   sem reconstruir o aplicativo.
*/

export const LEVELS = [
  { id: 1, nome: 'INICIANTE',     icone: '🐣', cor: '#22c55e', faixa: [1, 10] },
  { id: 2, nome: 'BÁSICO',        icone: '🟢', cor: '#16a34a', faixa: [11, 15] },
  { id: 3, nome: 'CONDICIONAIS',  icone: '🔵', cor: '#3b82f6', faixa: [16, 20] },
  { id: 4, nome: 'REPETIÇÃO',     icone: '🟠', cor: '#f97316', faixa: [21, 25] },
  { id: 5, nome: 'LÓGICA',        icone: '🔴', cor: '#ef4444', faixa: [26, 30] },
];

const print = (texto) => texto;

/* Cada teste:
   {
     input:  [linhas que serão fornecidas via input()],
     expected: texto exato esperado na saída,
     rotulo: descrição amigável do teste
   }
*/

export const CHALLENGES = [
  // ================= NÍVEL 1 — FUNDAMENTOS =================
  {
    id: 1,
    titulo: 'Seu primeiro programa',
    nivel: 'INICIANTE',
    enunciado: 'Crie um programa que mostre na tela o seu nome.',
    descricao:
      'Use a função print() para mostrar informações na tela. ' +
      'Escreva seu nome dentro de aspas para que o Python entenda que é um texto.',
    conceitos: ['print()', 'strings'],
    entradaEsperada: '',
    saidaEsperada: 'O nome do usuário',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: 'Maria' },
    ],
    dicas: [
      'Use print() para mostrar texto na tela.',
      'Coloque o nome entre aspas, por exemplo: print("Seu Nome").',
      'O texto entre aspas é chamado de string.',
    ],
    solucao: 'print("Maria")\n# Troque "Maria" pelo seu nome.\n# O print() mostra o que está entre parênteses na tela.',
    explicacao:
      'A função print() serve para exibir informações na tela. ' +
      'Quando colocamos um texto entre aspas dentro dos parênteses, o Python entende ' +
      'que é uma string (texto) e o mostra.',
    refSolucao: print('Maria'),
    testes: [
      { input: [], expected: '', ignoreCase: true, minLen: 1, tipo: 'texto', pontuacao: 100 },
    ],
  },
  {
    id: 2,
    titulo: 'Olá, mundo!',
    nivel: 'INICIANTE',
    enunciado: 'Mostre na tela a mensagem: Olá, mundo!',
    descricao:
      'Use print() para exibir exatamente a mensagem "Olá, mundo!" na tela. ' +
      'Preste atenção nos acentos e na pontuação.',
    conceitos: ['print()', 'strings'],
    entradaEsperada: '',
    saidaEsperada: 'Olá, mundo!',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: 'Olá, mundo!' },
    ],
    dicas: [
      'A mensagem deve ter exatamente os acentos: Olá, mundo!',
      'Use print("Olá, mundo!").',
    ],
    solucao: 'print("Olá, mundo!")',
    explicacao:
      'Basta usar a função print() com o texto exato entre aspas. ' +
      'A mensagem aparece na tela exatamente como foi escrita, incluindo acentos.',
    refSolucao: print('Olá, mundo!'),
    testes: [
      { input: [], expected: 'Olá, mundo!', tipo: 'exato', pontuacao: 100 },
    ],
  },
  {
    id: 3,
    titulo: 'Soma de dois números',
    nivel: 'INICIANTE',
    enunciado: 'Crie um programa que some dois números e mostre o resultado.',
    descricao:
      'Crie duas variáveis com números, some-as usando o operador + e mostre o ' +
      'resultado com print().',
    conceitos: ['variáveis', 'números', 'operadores matemáticos', 'print()'],
    entradaEsperada: '',
    saidaEsperada: 'Um número (resultado da soma)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '7' },
    ],
    dicas: [
      'Crie duas variáveis, por exemplo: a = 2 e b = 5.',
      'Some com o operador + e guarde o resultado ou use direto no print.',
      'print(a + b) mostra o resultado da soma.',
    ],
    solucao: 'a = 2\nb = 5\nprint(a + b)\n# Somamos as variáveis a e b e mostramos o resultado.',
    explicacao:
      'Números podem ser guardados em variáveis. O operador + soma dois valores. ' +
      'Podemos mostrar o resultado direto dentro do print(a + b).',
    refSolucao: print(2 + 5),
    testes: [
      { input: [], expected: '7', tipo: 'numero', pontuacao: 100 },
      { input: [], expected: '13', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 4,
    titulo: 'Subtração',
    nivel: 'INICIANTE',
    enunciado: 'Crie um programa que calcule a diferença entre dois números.',
    descricao:
      'Crie duas variáveis com números, subtraia usando o operador - e mostre o resultado.',
    conceitos: ['variáveis', 'números', 'operadores matemáticos', 'print()'],
    entradaEsperada: '',
    saidaEsperada: 'Um número (resultado da subtração)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '3' },
    ],
    dicas: [
      'Use o operador - para subtrair dois números.',
      'Exemplo: resultado = 8 - 5 e depois print(resultado).',
    ],
    solucao: 'a = 8\nb = 5\nresultado = a - b\nprint(resultado)\n# O operador - calcula a diferença entre a e b.',
    explicacao:
      'O operador - calcula a diferença (subtração) entre dois valores. ' +
      'Guardamos o resultado em uma variável e o mostramos com print().',
    refSolucao: print(8 - 5),
    testes: [
      { input: [], expected: '3', tipo: 'numero', pontuacao: 100 },
      { input: [], expected: '5', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 5,
    titulo: 'Multiplicação',
    nivel: 'INICIANTE',
    enunciado: 'Crie um programa que multiplique dois números.',
    descricao:
      'Crie duas variáveis com números, multiplique usando o operador * e mostre o resultado.',
    conceitos: ['variáveis', 'números', 'operadores matemáticos', 'print()'],
    entradaEsperada: '',
    saidaEsperada: 'Um número (resultado da multiplicação)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '15' },
    ],
    dicas: [
      'Use o operador * para multiplicar.',
      'Exemplo: 3 * 5 resulta em 15.',
    ],
    solucao: 'a = 3\nb = 5\nprint(a * b)\n# O operador * multiplica dois números.',
    explicacao:
      'O operador * é usado para multiplicação em Python. ' +
      'Multiplicamos os valores e mostramos o resultado.',
    refSolucao: print(3 * 5),
    testes: [
      { input: [], expected: '15', tipo: 'numero', pontuacao: 100 },
      { input: [], expected: '24', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 6,
    titulo: 'Divisão',
    nivel: 'INICIANTE',
    enunciado: 'Crie um programa que divida dois números.',
    descricao:
      'Crie duas variáveis com números, divida usando o operador / e mostre o resultado.',
    conceitos: ['variáveis', 'números', 'operadores matemáticos', 'print()'],
    entradaEsperada: '',
    saidaEsperada: 'Um número (resultado da divisão)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '2.0' },
    ],
    dicas: [
      'Use o operador / para dividir.',
      'Exemplo: 10 / 5 resulta em 2.0.',
      'A divisão em Python sempre produz um número decimal (float).',
    ],
    solucao: 'a = 10\nb = 5\nprint(a / b)\n# O operador / divide dois números.',
    explicacao:
      'O operador / realiza a divisão. Em Python, o resultado é sempre um ' +
      'número com ponto decimal (float), como 2.0.',
    refSolucao: print(10 / 5),
    testes: [
      { input: [], expected: '2.0', tipo: 'numeroF', pontuacao: 100 },
      { input: [], expected: '4.0', tipo: 'numeroF', pontuacaoBonus: true },
    ],
  },
  {
    id: 7,
    titulo: 'Área do quadrado',
    nivel: 'INICIANTE',
    enunciado: 'Receba o valor do lado de um quadrado e calcule sua área.',
    descricao:
      'A área de um quadrado é lado × lado. Use input() para receber o lado, ' +
      'transforme em número e mostre a área.',
    conceitos: ['input()', 'conversão de tipos', 'multiplicação'],
    entradaEsperada: 'um número (o lado)',
    saidaEsperada: 'a área (lado × lado)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '10', saida: '100' },
    ],
    dicas: [
      'Use input() para receber o lado.',
      'O valor do input() vem como texto. Transforme em número com int().',
      'A área é lado * lado.',
    ],
    solucao:
      'lado = int(input())\narea = lado * lado\nprint(area)\n# Recebemos o lado, convertemos para número e calculamos lado vezes lado.',
    explicacao:
      'O input() lê o que o usuário digita, mas sempre como texto. ' +
      'Por isso usamos int() para transformar em número inteiro. ' +
      'Depois multiplicamos o lado por ele mesmo para obter a área.',
    refSolucao: print(10 * 10),
    testes: [
      { input: ['10'], expected: '100', tipo: 'numero', pontuacao: 100 },
      { input: ['7'], expected: '49', tipo: 'numero', pontuacao: 100 },
      { input: ['5'], expected: '25', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 8,
    titulo: 'Área do retângulo',
    nivel: 'INICIANTE',
    enunciado: 'Receba largura e altura e calcule a área do retângulo.',
    descricao:
      'A área de um retângulo é largura × altura. Receba os dois valores com ' +
      'input() e mostre a área.',
    conceitos: ['input()', 'conversão de tipos', 'multiplicação'],
    entradaEsperada: 'largura e altura',
    saidaEsperada: 'a área (largura × altura)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '10\n5', saida: '50' },
    ],
    dicas: [
      'Receba a largura com input() e depois a altura com outro input().',
      'Converta cada um para número com int().',
      'Multiplique largura * altura para achar a área.',
    ],
    solucao:
      'largura = int(input())\naltura = int(input())\narea = largura * altura\nprint(area)\n# Cada input() lê uma linha digitada.',
    explicacao:
      'Usamos dois input() para receber os dois valores. ' +
      'Cada um é convertido com int() e depois multiplicados para achar a área.',
    refSolucao: print(10 * 5),
    testes: [
      { input: ['10', '5'], expected: '50', tipo: 'numero', pontuacao: 100 },
      { input: ['8', '3'], expected: '24', tipo: 'numero', pontuacao: 100 },
      { input: ['6', '6'], expected: '36', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 9,
    titulo: 'Dobro de um número',
    nivel: 'INICIANTE',
    enunciado: 'Receba um número e mostre o seu dobro.',
    descricao:
      'Receba um número com input(), calcule o dobro (número × 2) e mostre o resultado.',
    conceitos: ['input()', 'conversão de tipos', 'multiplicação'],
    entradaEsperada: 'um número',
    saidaEsperada: 'o dobro do número',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '12', saida: '24' },
    ],
    dicas: [
      'O dobro de um número é ele multiplicado por 2.',
      'Converte o valor do input() para número antes de calcular.',
    ],
    solucao:
      'numero = int(input())\ndobro = numero * 2\nprint(dobro)\n# Multiplicamos o número por 2 para achar o dobro.',
    explicacao:
      'Recebemos o número, o convertemos para inteiro e multiplicamos por 2 ' +
      'para obter o dobro.',
    refSolucao: print(12 * 2),
    testes: [
      { input: ['12'], expected: '24', tipo: 'numero', pontuacao: 100 },
      { input: ['9'], expected: '18', tipo: 'numero', pontuacao: 100 },
      { input: ['100'], expected: '200', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 10,
    titulo: 'Antecessor e sucessor',
    nivel: 'INICIANTE',
    enunciado: 'Receba um número inteiro e mostre seu antecessor e seu sucessor.',
    descricao:
      'O antecessor é o número menos 1 e o sucessor é o número mais 1. ' +
      'Mostre os dois valores.',
    conceitos: ['input()', 'soma', 'subtração'],
    entradaEsperada: 'um número inteiro',
    saidaEsperada: 'o antecessor e o sucessor',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '5', saida: '4 6' },
    ],
    dicas: [
      'Antecessor = número - 1.',
      'Sucessor = número + 1.',
      'Mostre os dois no mesma linha com print(antecessor, sucessor).',
    ],
    solucao:
      'n = int(input())\nantecessor = n - 1\nsucessor = n + 1\nprint(antecessor, sucessor)\n# O antecessor é n-1 e o sucessor é n+1.',
    explicacao:
      'Subtraímos 1 para achar o antecessor e somamos 1 para o sucessor. ' +
      'O print com vírgula mostra os dois valores separados por espaço.',
    refSolucao: print(4, 6),
    testes: [
      { input: ['5'], expected: [4, 6], tipo: 'numeros', pontuacao: 100 },
      { input: ['10'], expected: [9, 11], tipo: 'numeros', pontuacao: 100 },
      { input: ['100'], expected: [99, 101], tipo: 'numeros', pontuacaoBonus: true },
    ],
  },

  // ================= NÍVEL 2 — ENTRADA DE DADOS =================
  {
    id: 11,
    titulo: 'Nome do usuário',
    nivel: 'BÁSICO',
    enunciado: 'Solicite o nome do usuário e apresente uma mensagem personalizada.',
    descricao:
      'Use input() para perguntar o nome do usuário e depois mostre uma mensagem ' +
      'que inclua esse nome, por exemplo "Olá, Maria!"',
    conceitos: ['input()', 'variáveis', 'concatenação/f-string'],
    entradaEsperada: 'o nome do usuário',
    saidaEsperada: 'uma mensagem personalizada com o nome',
    exemplos: [
      { rotulo: 'Exemplo', entrada: 'Carlos', saida: 'Olá, Carlos!' },
    ],
    dicas: [
      'Receba o nome com input().',
      'Combine o texto com o nome usando f-string: print(f"Olá, {nome}!").',
    ],
    solucao:
      'nome = input()\nprint(f"Olá, {nome}!")\n# A f-string permite colocar o valor da variável dentro do texto com {}.',
    explicacao:
      'Guardamos o nome digitado na variável nome e usamos uma f-string, ' +
      'que coloca o valor da variável dentro do texto entre chaves {}.',
    refSolucao: print('Olá, Carlos!'),
    testes: [
      { input: ['Carlos'], expected: 'Carlos', tipo: 'contemNome', pontuacao: 100 },
      { input: ['Ana Souza'], expected: 'Ana Souza', tipo: 'contemNome', pontuacao: 100 },
      { input: ['João'], expected: 'João', tipo: 'contemNome', pontuacaoBonus: true },
    ],
  },
  {
    id: 12,
    titulo: 'Idade',
    nivel: 'BÁSICO',
    enunciado: 'Solicite a idade e informe quantos anos a pessoa terá daqui a 10 anos.',
    descricao:
      'Receba a idade atual com input(), some 10 e mostre a idade futura.',
    conceitos: ['input()', 'conversão de tipos', 'soma'],
    entradaEsperada: 'a idade atual',
    saidaEsperada: 'a idade daqui a 10 anos',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '15', saida: '25' },
    ],
    dicas: [
      'Converta a idade recebida para número com int().',
      'Some 10 à idade para achar a idade futura.',
    ],
    solucao:
      'idade = int(input())\nfuturo = idade + 10\nprint(futuro)\n# Somamos 10 à idade atual.',
    explicacao:
      'Recebemos a idade, a convertemos para número inteiro e somamos 10 ' +
      'para saber quantos anos a pessoa terá daqui a uma década.',
    refSolucao: print(15 + 10),
    testes: [
      { input: ['15'], expected: '25', tipo: 'numero', pontuacao: 100 },
      { input: ['30'], expected: '40', tipo: 'numero', pontuacao: 100 },
      { input: ['8'], expected: '18', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 13,
    titulo: 'Média de duas notas',
    nivel: 'BÁSICO',
    enunciado: 'Solicite duas notas e calcule a média.',
    descricao:
      'Receba duas notas com input(), some-as e divida por 2 para achar a média.',
    conceitos: ['input()', 'conversão de tipos', 'média'],
    entradaEsperada: 'duas notas',
    saidaEsperada: 'a média das notas',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '8\n6', saida: '7.0' },
    ],
    dicas: [
      'Converta as notas para número com float() pois podem ter decimais.',
      'A média é (nota1 + nota2) / 2.',
    ],
    solucao:
      'n1 = float(input())\nn2 = float(input())\nmedia = (n1 + n2) / 2\nprint(media)\n# Somamos as notas e dividimos por 2.',
    explicacao:
      'Usamos float() porque notas podem ter casas decimais. ' +
      'Somamos as duas notas e dividimos pela quantidade (2) para obter a média.',
    refSolucao: print((8 + 6) / 2),
    testes: [
      { input: ['8', '6'], expected: '7.0', tipo: 'numeroF', pontuacao: 100 },
      { input: ['10', '8'], expected: '9.0', tipo: 'numeroF', pontuacao: 100 },
      { input: ['7', '9'], expected: '8.0', tipo: 'numeroF', pontuacaoBonus: true },
    ],
  },
  {
    id: 14,
    titulo: 'Média de três notas',
    nivel: 'BÁSICO',
    enunciado: 'Solicite três notas e calcule a média.',
    descricao:
      'Receba três notas com input(), some-as e divida por 3 para achar a média.',
    conceitos: ['input()', 'conversão de tipos', 'média'],
    entradaEsperada: 'três notas',
    saidaEsperada: 'a média das notas',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '6\n7\n8', saida: '7.0' },
    ],
    dicas: [
      'Receba as três notas com três input().',
      'A média é (n1 + n2 + n3) / 3.',
    ],
    solucao:
      'n1 = float(input())\nn2 = float(input())\nn3 = float(input())\nmedia = (n1 + n2 + n3) / 3\nprint(media)',
    explicacao:
      'Recebemos as três notas, somamos todas e dividimos pela quantidade (3) ' +
      'para obter a média.',
    refSolucao: print((6 + 7 + 8) / 3),
    testes: [
      { input: ['6', '7', '8'], expected: '7.0', tipo: 'numeroF', pontuacao: 100 },
      { input: ['5', '7', '9'], expected: '7.0', tipo: 'numeroF', pontuacao: 100 },
      { input: ['10', '10', '10'], expected: '10.0', tipo: 'numeroF', pontuacaoBonus: true },
    ],
  },
  {
    id: 15,
    titulo: 'Conversão Celsius/Fahrenheit',
    nivel: 'BÁSICO',
    enunciado: 'Receba uma temperatura em Celsius e converta para Fahrenheit.',
    descricao:
      'A fórmula de conversão é: F = (C × 9/5) + 32. Receba o valor em Celsius ' +
      'e mostre o equivalente em Fahrenheit.',
    conceitos: ['input()', 'fórmula', 'conversão de tipos'],
    entradaEsperada: 'temperatura em Celsius',
    saidaEsperada: 'temperatura em Fahrenheit',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '100', saida: '212.0' },
    ],
    dicas: [
      'Fórmula: F = (C * 9/5) + 32.',
      'Use float() para aceitar temperaturas com decimal.',
    ],
    solucao:
      'c = float(input())\nf = (c * 9 / 5) + 32\nprint(f)\n# Aplicamos a fórmula de conversão para Fahrenheit.',
    explicacao:
      'A fórmula F = (C × 9/5) + 32 converte Celsius para Fahrenheit. ' +
      'Aplicamos a fórmula à temperatura recebida e mostramos o resultado.',
    refSolucao: print((100 * 9 / 5) + 32),
    testes: [
      { input: ['100'], expected: '212.0', tipo: 'numeroF', pontuacao: 100 },
      { input: ['0'], expected: '32.0', tipo: 'numeroF', pontuacao: 100 },
      { input: ['20'], expected: '68.0', tipo: 'numeroF', pontuacaoBonus: true },
    ],
  },

  // ================= NÍVEL 3 — CONDICIONAIS =================
  {
    id: 16,
    titulo: 'Número positivo ou negativo',
    nivel: 'CONDICIONAIS',
    enunciado: 'Receba um número e informe se ele é positivo, negativo ou zero.',
    descricao:
      'Use if/elif/else para verificar o sinal do número: positivo (maior que 0), ' +
      'negativo (menor que 0) ou zero.',
    conceitos: ['if', 'elif', 'else', 'comparação'],
    entradaEsperada: 'um número',
    saidaEsperada: 'positivo, negativo ou zero',
    exemplos: [
      { rotulo: 'Exemplo 1', entrada: '5', saida: 'positivo' },
      { rotulo: 'Exemplo 2', entrada: '-3', saida: 'negativo' },
      { rotulo: 'Exemplo 3', entrada: '0', saida: 'zero' },
    ],
    dicas: [
      'Número maior que 0 é positivo, menor que 0 é negativo.',
      'Use if para uma condição, elif para outra e else para o restante.',
    ],
    solucao:
      'n = int(input())\nif n > 0:\n    print("positivo")\nelif n < 0:\n    print("negativo")\nelse:\n    print("zero")',
    explicacao:
      'Usamos if para verificar se é maior que 0 (positivo), elif para menor que 0 ' +
      '(negativo) e else para o caso em que é igual a 0 (zero).',
    refSolucao: print('positivo'),
    testes: [
      { input: ['5'], expected: 'positivo', tipo: 'palavra', palavras: ['positivo'], pontuacao: 100 },
      { input: ['-3'], expected: 'negativo', tipo: 'palavra', palavras: ['negativo'], pontuacao: 100 },
      { input: ['0'], expected: 'zero', tipo: 'palavra', palavras: ['zero'], pontuacao: 100 },
      { input: ['-7'], expected: 'negativo', tipo: 'palavra', palavras: ['negativo'], pontuacaoBonus: true },
    ],
  },
  {
    id: 17,
    titulo: 'Par ou ímpar',
    nivel: 'CONDICIONAIS',
    enunciado: 'Receba um número inteiro e informe se ele é par ou ímpar.',
    descricao:
      'Um número é par quando, dividido por 2, o resto é 0. Use o operador % ' +
      'para verificar o resto da divisão e informe se é par ou ímpar.',
    conceitos: ['if/else', 'operador %', 'comparação'],
    entradaEsperada: 'um número inteiro',
    saidaEsperada: 'par ou ímpar',
    exemplos: [
      { rotulo: 'Exemplo 1', entrada: '8', saida: 'par' },
      { rotulo: 'Exemplo 2', entrada: '7', saida: 'ímpar' },
    ],
    dicas: [
      'O operador % mostra o resto da divisão.',
      'Se n % 2 == 0, o número é par.',
    ],
    solucao:
      'n = int(input())\nif n % 2 == 0:\n    print("par")\nelse:\n    print("ímpar")',
    explicacao:
      'O operador % retorna o resto da divisão. Se o resto da divisão por 2 for 0, ' +
      'o número é par; caso contrário, é ímpar.',
    refSolucao: print('par'),
    testes: [
      { input: ['8'], expected: 'par', tipo: 'palavra', palavras: ['par'], pontuacao: 100 },
      { input: ['7'], expected: 'ímpar', tipo: 'palavra', palavras: ['impar', 'ímpar', 'impar'], pontuacao: 100 },
      { input: ['10'], expected: 'par', tipo: 'palavra', palavras: ['par'], pontuacao: 100 },
      { input: ['3'], expected: 'ímpar', tipo: 'palavra', palavras: ['impar', 'ímpar'], pontuacaoBonus: true },
    ],
  },
  {
    id: 18,
    titulo: 'Maior número',
    nivel: 'CONDICIONAIS',
    enunciado: 'Receba dois números e informe qual é o maior.',
    descricao:
      'Use uma condição para comparar dois números e mostrar o maior. ' +
      'Se forem iguais, informe que são iguais.',
    conceitos: ['if/elif/else', 'comparação'],
    entradaEsperada: 'dois números',
    saidaEsperada: 'o maior número',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '10\n3', saida: '10' },
    ],
    dicas: [
      'Compare os dois números com > e <.',
      'Use else para o caso de serem iguais.',
    ],
    solucao:
      'a = int(input())\nb = int(input())\nif a > b:\n    print(a)\nelif b > a:\n    print(b)\nelse:\n    print("iguais")',
    explicacao:
      'Comparamos os dois números. O maior é mostrado; se nenhum for maior, ' +
      'informamos que são iguais.',
    refSolucao: print(10),
    testes: [
      { input: ['10', '3'], expected: '10', tipo: 'numero', pontuacao: 100 },
      { input: ['3', '10'], expected: '10', tipo: 'numero', pontuacao: 100 },
      { input: ['7', '7'], expected: 'iguais', tipo: 'palavra', palavras: ['igual', 'iguais', 'igual'], pontuacao: 100 },
      { input: ['50', '2'], expected: '50', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 19,
    titulo: 'Aprovação',
    nivel: 'CONDICIONAIS',
    enunciado: 'Receba uma nota e informe a situação do aluno.',
    descricao:
      'Receba uma nota de 0 a 10 e informe: Aprovado (nota >= 7), ' +
      'Recuperação (nota >= 5 e < 7) ou Reprovado (nota < 5).',
    conceitos: ['if/elif/else', 'comparações encadeadas'],
    entradaEsperada: 'uma nota de 0 a 10',
    saidaEsperada: 'Aprovado, Recuperação ou Reprovado',
    exemplos: [
      { rotulo: 'Aprovado', entrada: '8', saida: 'Aprovado' },
      { rotulo: 'Recuperação', entrada: '6', saida: 'Recuperação' },
      { rotulo: 'Reprovado', entrada: '4', saida: 'Reprovado' },
    ],
    dicas: [
      'Nota >= 7 → Aprovado.',
      'Nota >= 5 e < 7 → Recuperação.',
      'Nota < 5 → Reprovado.',
    ],
    solucao:
      'nota = float(input())\nif nota >= 7:\n    print("Aprovado")\nelif nota >= 5:\n    print("Recuperação")\nelse:\n    print("Reprovado")',
    explicacao:
      'Verificamos a nota em ordem: se for maior ou igual a 7 está aprovado; ' +
      'se for maior ou igual a 5 está de recuperação; senão está reprovado.',
    refSolucao: print('Aprovado'),
    testes: [
      { input: ['8'], expected: 'Aprovado', tipo: 'palavra', palavras: ['aprovado'], pontuacao: 100 },
      { input: ['6'], expected: 'Recuperação', tipo: 'palavra', palavras: ['recuperacao', 'recuperação'], pontuacao: 100 },
      { input: ['4'], expected: 'Reprovado', tipo: 'palavra', palavras: ['reprovado'], pontuacao: 100 },
      { input: ['9.5'], expected: 'Aprovado', tipo: 'palavra', palavras: ['aprovado'], pontuacao: 100 },
      { input: ['2'], expected: 'Reprovado', tipo: 'palavra', palavras: ['reprovado'], pontuacaoBonus: true },
    ],
  },
  {
    id: 20,
    titulo: 'Maioridade',
    nivel: 'CONDICIONAIS',
    enunciado: 'Receba a idade e informe se a pessoa é maior ou menor de idade.',
    descricao:
      'No Brasil, a maioridade é aos 18 anos. Receba a idade e informe se a ' +
      'pessoa é maior ou menor de idade.',
    conceitos: ['if/else', 'comparação'],
    entradaEsperada: 'a idade',
    saidaEsperada: 'maior de idade ou menor de idade',
    exemplos: [
      { rotulo: 'Maior', entrada: '20', saida: 'maior de idade' },
      { rotulo: 'Menor', entrada: '15', saida: 'menor de idade' },
    ],
    dicas: [
      'Se a idade for maior ou igual a 18, a pessoa é maior de idade.',
      'Caso contrário, é menor de idade.',
    ],
    solucao:
      'idade = int(input())\nif idade >= 18:\n    print("maior de idade")\nelse:\n    print("menor de idade")',
    explicacao:
      'Comparamos a idade com 18. Se for 18 ou mais, é maior de idade; ' +
      'se for menos, é menor de idade.',
    refSolucao: print('maior de idade'),
    testes: [
      { input: ['20'], expected: 'maior de idade', tipo: 'palavra', palavras: ['maior'], pontuacao: 100 },
      { input: ['15'], expected: 'menor de idade', tipo: 'palavra', palavras: ['menor'], pontuacao: 100 },
      { input: ['18'], expected: 'maior de idade', tipo: 'palavra', palavras: ['maior'], pontuacao: 100 },
      { input: ['10'], expected: 'menor de idade', tipo: 'palavra', palavras: ['menor'], pontuacaoBonus: true },
    ],
  },

  // ================= NÍVEL 4 — REPETIÇÃO =================
  {
    id: 21,
    titulo: 'Contagem',
    nivel: 'REPETIÇÃO',
    enunciado: 'Crie um programa que conte de 1 até 10.',
    descricao:
      'Use um loop for com range(1, 11) para mostrar os números de 1 a 10, ' +
      'um em cada linha.',
    conceitos: ['for', 'range()'],
    entradaEsperada: '',
    saidaEsperada: '1, 2, 3, ..., 10 (um por linha)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '1\n2\n3' },
    ],
    dicas: [
      'range(1, 11) gera os números de 1 até 10.',
      'Use for i in range(1, 11): print(i).',
      'Lembre-se: range para antes do último número.',
    ],
    solucao:
      'for i in range(1, 11):\n    print(i)\n# range(1, 11) gera os números de 1 a 10.',
    explicacao:
      'O loop for repete o código para cada valor gerado por range(). ' +
      'range(1, 11) gera 1, 2, 3 ... até 10, e cada um é mostrado.',
    refSolucao: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
    testes: [
      { input: [], expected: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10', tipo: 'sequencia', pontuacao: 100 },
    ],
  },
  {
    id: 22,
    titulo: 'Tabuada',
    nivel: 'REPETIÇÃO',
    enunciado: 'Receba um número e apresente sua tabuada de 1 a 10.',
    descricao:
      'Receba um número e mostre a tabuada dele, multiplicando de 1 até 10. ' +
      'Cada linha deve mostrar a multiplicação e o resultado.',
    conceitos: ['for', 'range()', 'f-string'],
    entradaEsperada: 'um número',
    saidaEsperada: 'a tabuada do número (1× até 10×)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '2', saida: '2 x 1 = 2\n2 x 2 = 4' },
    ],
    dicas: [
      'Use um for de 1 a 10.',
      'Em cada volta, mostre algo como f"{n} x {i} = {n*i}".',
    ],
    solucao:
      'n = int(input())\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n * i}")',
    explicacao:
      'O loop for percorre os multiplicadores de 1 a 10. Em cada volta, ' +
      'multiplicamos o número pelo multiplicador e mostramos a linha da tabuada.',
    refSolucao: '7 x 1 = 7',
    testes: [
      { input: ['7'], expected: ['7 x 1 = 7', '7 x 2 = 14', '7 x 3 = 21', '7 x 4 = 28', '7 x 5 = 35', '7 x 6 = 42', '7 x 7 = 49', '7 x 8 = 56', '7 x 9 = 63', '7 x 10 = 70'], tipo: 'tabuada', pontuacao: 100 },
      { input: ['3'], expected: ['3 x 1 = 3', '3 x 2 = 6', '3 x 3 = 9', '3 x 4 = 12', '3 x 5 = 15', '3 x 6 = 18', '3 x 7 = 21', '3 x 8 = 24', '3 x 9 = 27', '3 x 10 = 30'], tipo: 'tabuada', pontuacao: 100 },
    ],
  },
  {
    id: 23,
    titulo: 'Soma de números',
    nivel: 'REPETIÇÃO',
    enunciado: 'Crie um programa que some números de 1 até 100.',
    descricao:
      'Use um loop para somar todos os números de 1 até 100 e mostre o total. ' +
      'O resultado é 5050.',
    conceitos: ['for', 'range()', 'acumulador'],
    entradaEsperada: '',
    saidaEsperada: '5050 (a soma de 1 a 100)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '5050' },
    ],
    dicas: [
      'Crie uma variável soma = 0 antes do loop.',
      'Dentro do loop, faça soma = soma + i.',
      'Depois do loop, mostre soma.',
    ],
    solucao:
      'soma = 0\nfor i in range(1, 101):\n    soma = soma + i\nprint(soma)\n# A variável soma acumula todos os valores.',
    explicacao:
      'Usamos uma variável acumuladora. Antes do loop ela vale 0; dentro do loop ' +
      'somamos cada número a ela. Ao final, soma contém o total.',
    refSolucao: print(5050),
    testes: [
      { input: [], expected: '5050', tipo: 'numero', pontuacao: 100 },
    ],
  },
  {
    id: 24,
    titulo: 'Contagem regressiva',
    nivel: 'REPETIÇÃO',
    enunciado: 'Crie uma contagem regressiva de 10 até 0.',
    descricao:
      'Use um loop para mostrar os números de 10 até 0, um em cada linha.',
    conceitos: ['for', 'range() com passo negativo'],
    entradaEsperada: '',
    saidaEsperada: '10, 9, 8, ..., 0 (um por linha)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '10\n9\n8' },
    ],
    dicas: [
      'range(10, -1, -1) gera os números de 10 até 0.',
      'O terceiro valor do range é o passo (-1 para contar para trás).',
    ],
    solucao:
      'for i in range(10, -1, -1):\n    print(i)\n# O passo -1 faz a contagem regressiva.',
    explicacao:
      'O range(10, -1, -1) começa em 10, para antes de -1 (ou seja, até 0) e ' +
      'diminui 1 a cada passo, criando a contagem regressiva.',
    refSolucao: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0',
    testes: [
      { input: [], expected: '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0', tipo: 'sequencia', pontuacao: 100 },
    ],
  },
  {
    id: 25,
    titulo: 'Números pares',
    nivel: 'REPETIÇÃO',
    enunciado: 'Mostre os números pares de 1 até 20.',
    descricao:
      'Mostre todos os números pares entre 1 e 20 (2, 4, 6, ..., 20), ' +
      'um em cada linha.',
    conceitos: ['for', 'range() com passo', 'operador %'],
    entradaEsperada: '',
    saidaEsperada: '2, 4, 6, ..., 20 (um por linha)',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '2\n4\n6' },
    ],
    dicas: [
      'Use range(2, 21, 2) que gera apenas os números pares.',
      'Ou use um for de 1 a 20 e teste com i % 2 == 0.',
    ],
    solucao:
      'for i in range(2, 21, 2):\n    print(i)\n# O passo 2 faz o range pular de 2 em 2, gerando só pares.',
    explicacao:
      'O range(2, 21, 2) começa em 2 e aumenta de 2 em 2 até antes de 21, ' +
      'gerando apenas os números pares de 2 a 20.',
    refSolucao: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20',
    testes: [
      { input: [], expected: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20', tipo: 'sequencia', pontuacao: 100 },
    ],
  },

  // ================= NÍVEL 5 — LÓGICA =================
  {
    id: 26,
    titulo: 'Fatorial',
    nivel: 'LÓGICA',
    enunciado: 'Receba um número e calcule seu fatorial.',
    descricao:
      'O fatorial de um número n (escrito n!) é o produto de todos os números ' +
      'de 1 até n. Por exemplo, 5! = 5 × 4 × 3 × 2 × 1 = 120.',
    conceitos: ['for', 'loop', 'acumulador'],
    entradaEsperada: 'um número inteiro',
    saidaEsperada: 'o fatorial do número',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '5', saida: '120' },
    ],
    dicas: [
      'Crie uma variável fatorial = 1.',
      'Multiplique pelos números de 1 até n.',
      'Para 5: 1×2×3×4×5 = 120.',
    ],
    solucao:
      'n = int(input())\nfatorial = 1\nfor i in range(1, n + 1):\n    fatorial = fatorial * i\nprint(fatorial)',
    explicacao:
      'Começamos com fatorial = 1 e multiplicamos por cada número de 1 até n. ' +
      'O resultado é o produto de todos esses números, ou seja, o fatorial.',
    refSolucao: print(120),
    testes: [
      { input: ['5'], expected: '120', tipo: 'numero', pontuacao: 100 },
      { input: ['3'], expected: '6', tipo: 'numero', pontuacao: 100 },
      { input: ['7'], expected: '5040', tipo: 'numero', pontuacao: 100 },
      { input: ['4'], expected: '24', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 27,
    titulo: 'Média de uma lista',
    nivel: 'LÓGICA',
    enunciado: 'Crie uma lista de números e calcule sua média.',
    descricao:
      'Crie uma lista com alguns números, some todos os elementos e divida pela ' +
      'quantidade de elementos para achar a média.',
    conceitos: ['listas', 'sum()', 'len()'],
    entradaEsperada: '',
    saidaEsperada: 'a média dos números da lista',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '5.0' },
    ],
    dicas: [
      'Use sum(lista) para somar e len(lista) para o número de elementos.',
      'A média é sum(lista) / len(lista).',
    ],
    solucao:
      'numeros = [2, 4, 6, 8]\nmedia = sum(numeros) / len(numeros)\nprint(media)\n# sum somas, len conta. A média é soma dividida pela quantidade.',
    explicacao:
      'A função sum() soma todos os elementos da lista e len() conta quantos ' +
      'elementos existem. Dividimos a soma pela quantidade para obter a média.',
    refSolucao: print(5.0),
    testes: [
      { input: [], expected: '5.0', tipo: 'numeroF', pontuacao: 100 },
      { input: [], expected: '6.0', tipo: 'numeroF', pontuacaoBonus: true },
    ],
  },
  {
    id: 28,
    titulo: 'Maior número da lista',
    nivel: 'LÓGICA',
    enunciado: 'Crie uma lista e descubra qual é o maior número.',
    descricao:
      'Crie uma lista de números e descubra qual é o maior. Você pode usar a ' +
      'função max() ou um loop para comparar os valores.',
    conceitos: ['listas', 'max()', 'comparação'],
    entradaEsperada: '',
    saidaEsperada: 'o maior número da lista',
    exemplos: [
      { rotulo: 'Exemplo', entrada: '', saida: '42' },
    ],
    dicas: [
      'Use max(lista) para achar o maior número.',
      'Ou faça um loop comparando cada valor.',
    ],
    solucao:
      'numeros = [10, 3, 42, 7, 15]\nmaior = max(numeros)\nprint(maior)\n# max() retorna o maior valor da lista.',
    explicacao:
      'A função max() percorre a lista e retorna o maior número encontrado.',
    refSolucao: print(42),
    testes: [
      { input: [], expected: '42', tipo: 'numero', pontuacao: 100 },
      { input: [], expected: '99', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 29,
    titulo: 'Contar vogais',
    nivel: 'LÓGICA',
    enunciado: 'Receba uma palavra e conte quantas vogais ela possui.',
    descricao:
      'Receba uma palavra e conte quantas letras são vogais (a, e, i, o, u). ' +
      'Considere também as letras maiúsculas e acentuadas.',
    conceitos: ['loops', 'strings', 'condicionais'],
    entradaEsperada: 'uma palavra',
    saidaEsperada: 'a quantidade de vogais',
    exemplos: [
      { rotulo: 'Exemplo', entrada: 'programacao', saida: '5' },
    ],
    dicas: [
      'Percorra cada letra da palavra com um for.',
      'Use uma lista de vogais para verificar: "aeiouAEIOU".',
      'Incremente um contador a cada vogal encontrada.',
    ],
    solucao:
      'palavra = input()\nqtd = 0\nvogais = "aeiouAEIOUáéíóúÁÉÍÓÚ"\nfor letra in palavra:\n    if letra in vogais:\n        qtd = qtd + 1\nprint(qtd)',
    explicacao:
      'Percorremos cada letra da palavra com um for. Para cada letra, verificamos ' +
      'se ela está na lista de vogais; se sim, aumentamos o contador.',
    refSolucao: print(5),
    testes: [
      { input: ['programacao'], expected: '5', tipo: 'numero', pontuacao: 100 },
      { input: ['python'], expected: '1', tipo: 'numero', pontuacao: 100 },
      { input: ['abc'], expected: '1', tipo: 'numero', pontuacao: 100 },
      { input: ['aeiou'], expected: '5', tipo: 'numero', pontuacaoBonus: true },
      { input: ['olá'], expected: '2', tipo: 'numero', pontuacaoBonus: true },
    ],
  },
  {
    id: 30,
    titulo: 'Desafio final',
    nivel: 'LÓGICA',
    enunciado:
      'Crie um pequeno programa que reúna seus conhecimentos: solicite o nome, ' +
      'solicite três notas, calcule a média, informe a situação e apresente uma ' +
      'mensagem personalizada.',
    descricao:
      'Combine tudo o que aprendeu: input(), variáveis, cálculo de média, ' +
      'condicionais e mensagens personalizadas. Regra: média >= 7 Aprovado, ' +
      '>= 5 Recuperação, senão Reprovado.',
    conceitos: ['input()', 'variáveis', 'média', 'condicionais', 'strings'],
    entradaEsperada: 'nome e três notas',
    saidaEsperada: 'a média e a situação do aluno',
    exemplos: [
      { rotulo: 'Exemplo', entrada: 'Maria\n7\n8\n9', saida: 'Média: 8.0 - Aprovado' },
    ],
    dicas: [
      'Receba o nome e as três notas.',
      'Calcule a média com (n1+n2+n3)/3.',
      'Use if/elif/else para a situação.',
      'Mostre uma mensagem com o nome e a média.',
    ],
    solucao:
      'nome = input()\nn1 = float(input())\nn2 = float(input())\nn3 = float(input())\nmedia = (n1 + n2 + n3) / 3\nif media >= 7:\n    situacao = "Aprovado"\nelif media >= 5:\n    situacao = "Recuperação"\nelse:\n    situacao = "Reprovado"\nprint(f"{nome}, sua média é {media:.1f} - {situacao}")',
    explicacao:
      'Este desafio junta vários conceitos: recebemos dados com input(), ' +
      'calculamos a média, usamos condicionais para a situação e criamos uma ' +
      'mensagem personalizada com f-string.',
    refSolucao: 'Média: 8.0 - Aprovado',
    testes: [
      { input: ['Maria', '7', '8', '9'], expected: '8.0', tipo: 'contemMedia', notaFinal: 'Aprovado', pontuacao: 100 },
      { input: ['João', '5', '5', '7'], expected: '5.7', tipo: 'contemMedia', notaFinal: 'Recuperação', pontuacao: 100 },
      { input: ['Ana', '3', '4', '2'], expected: '3.0', tipo: 'contemMedia', notaFinal: 'Reprovado', pontuacao: 100 },
    ],
  },
];

/* Conquistas do aplicativo */
export const ACHIEVEMENTS = [
  { id: 'primeiro',   icone: '🏆', titulo: 'Primeiro Código',       descricao: 'Resolveu seu primeiro desafio.',            condicao: (p) => p.concluidos >= 1 },
  { id: 'cinco',      icone: '🏆', titulo: '5 Desafios',            descricao: 'Completou 5 desafios.',                      condicao: (p) => p.concluidos >= 5 },
  { id: 'loops',      icone: '🏆', titulo: 'Mestre dos Loops',      descricao: 'Completou todos os desafios de repetição.', condicao: (p) => todosDoNivel(p, 4) },
  { id: 'logica',     icone: '🏆', titulo: 'Lógica Python',         descricao: 'Completou os desafios de lógica.',          condicao: (p) => todosDoNivel(p, 5) },
  { id: 'master',     icone: '🏆', titulo: 'Python Code Master',    descricao: 'Completou os 30 desafios.',                 condicao: (p) => p.concluidos >= 30 },
];

function todosDoNivel(progresso, nivel) {
  const faixa = LEVELS.find((l) => l.id === nivel)?.faixa || [0, 0];
  for (let i = faixa[0]; i <= faixa[1]; i++) {
    if (!progresso.resolvidos.includes(i)) return false;
  }
  return true;
}

export function getLevelForChallenge(id) {
  for (const l of LEVELS) {
    if (id >= l.faixa[0] && id <= l.faixa[1]) return l;
  }
  return LEVELS[0];
}

export function getLevelById(id) {
  return LEVELS.find((l) => l.id === id);
}
