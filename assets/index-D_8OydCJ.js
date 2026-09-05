(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const ue="modulepreload",le=function(e){return"/desafio-python-code-web/"+e},k={},j=function(a,o,t){let r=Promise.resolve();if(o&&o.length>0){let s=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),u=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));r=s(o.map(c=>{if(c=le(c),c in k)return;k[c]=!0;const p=c.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const l=document.createElement("link");if(l.rel=p?"stylesheet":ue,p||(l.as="script"),l.crossOrigin="",l.href=c,u&&l.setAttribute("nonce",u),document.head.appendChild(l),p)return new Promise((x,h)=>{l.addEventListener("load",x),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(s){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s}return r.then(s=>{for(const i of s||[])i.status==="rejected"&&n(i.reason);return a().catch(n)})},$=[{id:1,nome:"INICIANTE",icone:"🐣",cor:"#22c55e",faixa:[1,10]},{id:2,nome:"BÁSICO",icone:"🟢",cor:"#16a34a",faixa:[11,15]},{id:3,nome:"CONDICIONAIS",icone:"🔵",cor:"#3b82f6",faixa:[16,20]},{id:4,nome:"REPETIÇÃO",icone:"🟠",cor:"#f97316",faixa:[21,25]},{id:5,nome:"LÓGICA",icone:"🔴",cor:"#ef4444",faixa:[26,30]}],v=e=>e,f=[{id:1,titulo:"Seu primeiro programa",nivel:"INICIANTE",enunciado:"Crie um programa que mostre na tela o seu nome.",descricao:"Use a função print() para mostrar informações na tela. Escreva seu nome dentro de aspas para que o Python entenda que é um texto.",conceitos:["print()","strings"],entradaEsperada:"",saidaEsperada:"O nome do usuário",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"Maria"}],dicas:["Use print() para mostrar texto na tela.",'Coloque o nome entre aspas, por exemplo: print("Seu Nome").',"O texto entre aspas é chamado de string."],solucao:`print("Maria")
# Troque "Maria" pelo seu nome.
# O print() mostra o que está entre parênteses na tela.`,explicacao:"A função print() serve para exibir informações na tela. Quando colocamos um texto entre aspas dentro dos parênteses, o Python entende que é uma string (texto) e o mostra.",refSolucao:v("Maria"),testes:[{input:[],expected:"",ignoreCase:!0,minLen:1,tipo:"texto",pontuacao:100}]},{id:2,titulo:"Olá, mundo!",nivel:"INICIANTE",enunciado:"Mostre na tela a mensagem: Olá, mundo!",descricao:'Use print() para exibir exatamente a mensagem "Olá, mundo!" na tela. Preste atenção nos acentos e na pontuação.',conceitos:["print()","strings"],entradaEsperada:"",saidaEsperada:"Olá, mundo!",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"Olá, mundo!"}],dicas:["A mensagem deve ter exatamente os acentos: Olá, mundo!",'Use print("Olá, mundo!").'],solucao:'print("Olá, mundo!")',explicacao:"Basta usar a função print() com o texto exato entre aspas. A mensagem aparece na tela exatamente como foi escrita, incluindo acentos.",refSolucao:v("Olá, mundo!"),testes:[{input:[],expected:"Olá, mundo!",tipo:"exato",pontuacao:100}]},{id:3,titulo:"Soma de dois números",nivel:"INICIANTE",enunciado:"Crie um programa que some dois números e mostre o resultado.",descricao:"Crie duas variáveis com números, some-as usando o operador + e mostre o resultado com print().",conceitos:["variáveis","números","operadores matemáticos","print()"],entradaEsperada:"",saidaEsperada:"Um número (resultado da soma)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"7"}],dicas:["Crie duas variáveis, por exemplo: a = 2 e b = 5.","Some com o operador + e guarde o resultado ou use direto no print.","print(a + b) mostra o resultado da soma."],solucao:`a = 2
b = 5
print(a + b)
# Somamos as variáveis a e b e mostramos o resultado.`,explicacao:"Números podem ser guardados em variáveis. O operador + soma dois valores. Podemos mostrar o resultado direto dentro do print(a + b).",refSolucao:v(7),testes:[{input:[],expected:"7",tipo:"numero",pontuacao:100},{input:[],expected:"13",tipo:"numero",pontuacaoBonus:!0}]},{id:4,titulo:"Subtração",nivel:"INICIANTE",enunciado:"Crie um programa que calcule a diferença entre dois números.",descricao:"Crie duas variáveis com números, subtraia usando o operador - e mostre o resultado.",conceitos:["variáveis","números","operadores matemáticos","print()"],entradaEsperada:"",saidaEsperada:"Um número (resultado da subtração)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"3"}],dicas:["Use o operador - para subtrair dois números.","Exemplo: resultado = 8 - 5 e depois print(resultado)."],solucao:`a = 8
b = 5
resultado = a - b
print(resultado)
# O operador - calcula a diferença entre a e b.`,explicacao:"O operador - calcula a diferença (subtração) entre dois valores. Guardamos o resultado em uma variável e o mostramos com print().",refSolucao:v(3),testes:[{input:[],expected:"3",tipo:"numero",pontuacao:100},{input:[],expected:"5",tipo:"numero",pontuacaoBonus:!0}]},{id:5,titulo:"Multiplicação",nivel:"INICIANTE",enunciado:"Crie um programa que multiplique dois números.",descricao:"Crie duas variáveis com números, multiplique usando o operador * e mostre o resultado.",conceitos:["variáveis","números","operadores matemáticos","print()"],entradaEsperada:"",saidaEsperada:"Um número (resultado da multiplicação)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"15"}],dicas:["Use o operador * para multiplicar.","Exemplo: 3 * 5 resulta em 15."],solucao:`a = 3
b = 5
print(a * b)
# O operador * multiplica dois números.`,explicacao:"O operador * é usado para multiplicação em Python. Multiplicamos os valores e mostramos o resultado.",refSolucao:v(15),testes:[{input:[],expected:"15",tipo:"numero",pontuacao:100},{input:[],expected:"24",tipo:"numero",pontuacaoBonus:!0}]},{id:6,titulo:"Divisão",nivel:"INICIANTE",enunciado:"Crie um programa que divida dois números.",descricao:"Crie duas variáveis com números, divida usando o operador / e mostre o resultado.",conceitos:["variáveis","números","operadores matemáticos","print()"],entradaEsperada:"",saidaEsperada:"Um número (resultado da divisão)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"2.0"}],dicas:["Use o operador / para dividir.","Exemplo: 10 / 5 resulta em 2.0.","A divisão em Python sempre produz um número decimal (float)."],solucao:`a = 10
b = 5
print(a / b)
# O operador / divide dois números.`,explicacao:"O operador / realiza a divisão. Em Python, o resultado é sempre um número com ponto decimal (float), como 2.0.",refSolucao:v(10/5),testes:[{input:[],expected:"2.0",tipo:"numeroF",pontuacao:100},{input:[],expected:"4.0",tipo:"numeroF",pontuacaoBonus:!0}]},{id:7,titulo:"Área do quadrado",nivel:"INICIANTE",enunciado:"Receba o valor do lado de um quadrado e calcule sua área.",descricao:"A área de um quadrado é lado × lado. Use input() para receber o lado, transforme em número e mostre a área.",conceitos:["input()","conversão de tipos","multiplicação"],entradaEsperada:"um número (o lado)",saidaEsperada:"a área (lado × lado)",exemplos:[{rotulo:"Exemplo",entrada:"10",saida:"100"}],dicas:["Use input() para receber o lado.","O valor do input() vem como texto. Transforme em número com int().","A área é lado * lado."],solucao:`lado = int(input())
area = lado * lado
print(area)
# Recebemos o lado, convertemos para número e calculamos lado vezes lado.`,explicacao:"O input() lê o que o usuário digita, mas sempre como texto. Por isso usamos int() para transformar em número inteiro. Depois multiplicamos o lado por ele mesmo para obter a área.",refSolucao:v(100),testes:[{input:["10"],expected:"100",tipo:"numero",pontuacao:100},{input:["7"],expected:"49",tipo:"numero",pontuacao:100},{input:["5"],expected:"25",tipo:"numero",pontuacaoBonus:!0}]},{id:8,titulo:"Área do retângulo",nivel:"INICIANTE",enunciado:"Receba largura e altura e calcule a área do retângulo.",descricao:"A área de um retângulo é largura × altura. Receba os dois valores com input() e mostre a área.",conceitos:["input()","conversão de tipos","multiplicação"],entradaEsperada:"largura e altura",saidaEsperada:"a área (largura × altura)",exemplos:[{rotulo:"Exemplo",entrada:`10
5`,saida:"50"}],dicas:["Receba a largura com input() e depois a altura com outro input().","Converta cada um para número com int().","Multiplique largura * altura para achar a área."],solucao:`largura = int(input())
altura = int(input())
area = largura * altura
print(area)
# Cada input() lê uma linha digitada.`,explicacao:"Usamos dois input() para receber os dois valores. Cada um é convertido com int() e depois multiplicados para achar a área.",refSolucao:v(50),testes:[{input:["10","5"],expected:"50",tipo:"numero",pontuacao:100},{input:["8","3"],expected:"24",tipo:"numero",pontuacao:100},{input:["6","6"],expected:"36",tipo:"numero",pontuacaoBonus:!0}]},{id:9,titulo:"Dobro de um número",nivel:"INICIANTE",enunciado:"Receba um número e mostre o seu dobro.",descricao:"Receba um número com input(), calcule o dobro (número × 2) e mostre o resultado.",conceitos:["input()","conversão de tipos","multiplicação"],entradaEsperada:"um número",saidaEsperada:"o dobro do número",exemplos:[{rotulo:"Exemplo",entrada:"12",saida:"24"}],dicas:["O dobro de um número é ele multiplicado por 2.","Converte o valor do input() para número antes de calcular."],solucao:`numero = int(input())
dobro = numero * 2
print(dobro)
# Multiplicamos o número por 2 para achar o dobro.`,explicacao:"Recebemos o número, o convertemos para inteiro e multiplicamos por 2 para obter o dobro.",refSolucao:v(24),testes:[{input:["12"],expected:"24",tipo:"numero",pontuacao:100},{input:["9"],expected:"18",tipo:"numero",pontuacao:100},{input:["100"],expected:"200",tipo:"numero",pontuacaoBonus:!0}]},{id:10,titulo:"Antecessor e sucessor",nivel:"INICIANTE",enunciado:"Receba um número inteiro e mostre seu antecessor e seu sucessor.",descricao:"O antecessor é o número menos 1 e o sucessor é o número mais 1. Mostre os dois valores.",conceitos:["input()","soma","subtração"],entradaEsperada:"um número inteiro",saidaEsperada:"o antecessor e o sucessor",exemplos:[{rotulo:"Exemplo",entrada:"5",saida:"4 6"}],dicas:["Antecessor = número - 1.","Sucessor = número + 1.","Mostre os dois no mesma linha com print(antecessor, sucessor)."],solucao:`n = int(input())
antecessor = n - 1
sucessor = n + 1
print(antecessor, sucessor)
# O antecessor é n-1 e o sucessor é n+1.`,explicacao:"Subtraímos 1 para achar o antecessor e somamos 1 para o sucessor. O print com vírgula mostra os dois valores separados por espaço.",refSolucao:v(4),testes:[{input:["5"],expected:[4,6],tipo:"numeros",pontuacao:100},{input:["10"],expected:[9,11],tipo:"numeros",pontuacao:100},{input:["100"],expected:[99,101],tipo:"numeros",pontuacaoBonus:!0}]},{id:11,titulo:"Nome do usuário",nivel:"BÁSICO",enunciado:"Solicite o nome do usuário e apresente uma mensagem personalizada.",descricao:'Use input() para perguntar o nome do usuário e depois mostre uma mensagem que inclua esse nome, por exemplo "Olá, Maria!"',conceitos:["input()","variáveis","concatenação/f-string"],entradaEsperada:"o nome do usuário",saidaEsperada:"uma mensagem personalizada com o nome",exemplos:[{rotulo:"Exemplo",entrada:"Carlos",saida:"Olá, Carlos!"}],dicas:["Receba o nome com input().",'Combine o texto com o nome usando f-string: print(f"Olá, {nome}!").'],solucao:`nome = input()
print(f"Olá, {nome}!")
# A f-string permite colocar o valor da variável dentro do texto com {}.`,explicacao:"Guardamos o nome digitado na variável nome e usamos uma f-string, que coloca o valor da variável dentro do texto entre chaves {}.",refSolucao:v("Olá, Carlos!"),testes:[{input:["Carlos"],expected:"Carlos",tipo:"contemNome",pontuacao:100},{input:["Ana Souza"],expected:"Ana Souza",tipo:"contemNome",pontuacao:100},{input:["João"],expected:"João",tipo:"contemNome",pontuacaoBonus:!0}]},{id:12,titulo:"Idade",nivel:"BÁSICO",enunciado:"Solicite a idade e informe quantos anos a pessoa terá daqui a 10 anos.",descricao:"Receba a idade atual com input(), some 10 e mostre a idade futura.",conceitos:["input()","conversão de tipos","soma"],entradaEsperada:"a idade atual",saidaEsperada:"a idade daqui a 10 anos",exemplos:[{rotulo:"Exemplo",entrada:"15",saida:"25"}],dicas:["Converta a idade recebida para número com int().","Some 10 à idade para achar a idade futura."],solucao:`idade = int(input())
futuro = idade + 10
print(futuro)
# Somamos 10 à idade atual.`,explicacao:"Recebemos a idade, a convertemos para número inteiro e somamos 10 para saber quantos anos a pessoa terá daqui a uma década.",refSolucao:v(25),testes:[{input:["15"],expected:"25",tipo:"numero",pontuacao:100},{input:["30"],expected:"40",tipo:"numero",pontuacao:100},{input:["8"],expected:"18",tipo:"numero",pontuacaoBonus:!0}]},{id:13,titulo:"Média de duas notas",nivel:"BÁSICO",enunciado:"Solicite duas notas e calcule a média.",descricao:"Receba duas notas com input(), some-as e divida por 2 para achar a média.",conceitos:["input()","conversão de tipos","média"],entradaEsperada:"duas notas",saidaEsperada:"a média das notas",exemplos:[{rotulo:"Exemplo",entrada:`8
6`,saida:"7.0"}],dicas:["Converta as notas para número com float() pois podem ter decimais.","A média é (nota1 + nota2) / 2."],solucao:`n1 = float(input())
n2 = float(input())
media = (n1 + n2) / 2
print(media)
# Somamos as notas e dividimos por 2.`,explicacao:"Usamos float() porque notas podem ter casas decimais. Somamos as duas notas e dividimos pela quantidade (2) para obter a média.",refSolucao:v(14/2),testes:[{input:["8","6"],expected:"7.0",tipo:"numeroF",pontuacao:100},{input:["10","8"],expected:"9.0",tipo:"numeroF",pontuacao:100},{input:["7","9"],expected:"8.0",tipo:"numeroF",pontuacaoBonus:!0}]},{id:14,titulo:"Média de três notas",nivel:"BÁSICO",enunciado:"Solicite três notas e calcule a média.",descricao:"Receba três notas com input(), some-as e divida por 3 para achar a média.",conceitos:["input()","conversão de tipos","média"],entradaEsperada:"três notas",saidaEsperada:"a média das notas",exemplos:[{rotulo:"Exemplo",entrada:`6
7
8`,saida:"7.0"}],dicas:["Receba as três notas com três input().","A média é (n1 + n2 + n3) / 3."],solucao:`n1 = float(input())
n2 = float(input())
n3 = float(input())
media = (n1 + n2 + n3) / 3
print(media)`,explicacao:"Recebemos as três notas, somamos todas e dividimos pela quantidade (3) para obter a média.",refSolucao:v(21/3),testes:[{input:["6","7","8"],expected:"7.0",tipo:"numeroF",pontuacao:100},{input:["5","7","9"],expected:"7.0",tipo:"numeroF",pontuacao:100},{input:["10","10","10"],expected:"10.0",tipo:"numeroF",pontuacaoBonus:!0}]},{id:15,titulo:"Conversão Celsius/Fahrenheit",nivel:"BÁSICO",enunciado:"Receba uma temperatura em Celsius e converta para Fahrenheit.",descricao:"A fórmula de conversão é: F = (C × 9/5) + 32. Receba o valor em Celsius e mostre o equivalente em Fahrenheit.",conceitos:["input()","fórmula","conversão de tipos"],entradaEsperada:"temperatura em Celsius",saidaEsperada:"temperatura em Fahrenheit",exemplos:[{rotulo:"Exemplo",entrada:"100",saida:"212.0"}],dicas:["Fórmula: F = (C * 9/5) + 32.","Use float() para aceitar temperaturas com decimal."],solucao:`c = float(input())
f = (c * 9 / 5) + 32
print(f)
# Aplicamos a fórmula de conversão para Fahrenheit.`,explicacao:"A fórmula F = (C × 9/5) + 32 converte Celsius para Fahrenheit. Aplicamos a fórmula à temperatura recebida e mostramos o resultado.",refSolucao:v(900/5+32),testes:[{input:["100"],expected:"212.0",tipo:"numeroF",pontuacao:100},{input:["0"],expected:"32.0",tipo:"numeroF",pontuacao:100},{input:["20"],expected:"68.0",tipo:"numeroF",pontuacaoBonus:!0}]},{id:16,titulo:"Número positivo ou negativo",nivel:"CONDICIONAIS",enunciado:"Receba um número e informe se ele é positivo, negativo ou zero.",descricao:"Use if/elif/else para verificar o sinal do número: positivo (maior que 0), negativo (menor que 0) ou zero.",conceitos:["if","elif","else","comparação"],entradaEsperada:"um número",saidaEsperada:"positivo, negativo ou zero",exemplos:[{rotulo:"Exemplo 1",entrada:"5",saida:"positivo"},{rotulo:"Exemplo 2",entrada:"-3",saida:"negativo"},{rotulo:"Exemplo 3",entrada:"0",saida:"zero"}],dicas:["Número maior que 0 é positivo, menor que 0 é negativo.","Use if para uma condição, elif para outra e else para o restante."],solucao:`n = int(input())
if n > 0:
    print("positivo")
elif n < 0:
    print("negativo")
else:
    print("zero")`,explicacao:"Usamos if para verificar se é maior que 0 (positivo), elif para menor que 0 (negativo) e else para o caso em que é igual a 0 (zero).",refSolucao:v("positivo"),testes:[{input:["5"],expected:"positivo",tipo:"palavra",palavras:["positivo"],pontuacao:100},{input:["-3"],expected:"negativo",tipo:"palavra",palavras:["negativo"],pontuacao:100},{input:["0"],expected:"zero",tipo:"palavra",palavras:["zero"],pontuacao:100},{input:["-7"],expected:"negativo",tipo:"palavra",palavras:["negativo"],pontuacaoBonus:!0}]},{id:17,titulo:"Par ou ímpar",nivel:"CONDICIONAIS",enunciado:"Receba um número inteiro e informe se ele é par ou ímpar.",descricao:"Um número é par quando, dividido por 2, o resto é 0. Use o operador % para verificar o resto da divisão e informe se é par ou ímpar.",conceitos:["if/else","operador %","comparação"],entradaEsperada:"um número inteiro",saidaEsperada:"par ou ímpar",exemplos:[{rotulo:"Exemplo 1",entrada:"8",saida:"par"},{rotulo:"Exemplo 2",entrada:"7",saida:"ímpar"}],dicas:["O operador % mostra o resto da divisão.","Se n % 2 == 0, o número é par."],solucao:`n = int(input())
if n % 2 == 0:
    print("par")
else:
    print("ímpar")`,explicacao:"O operador % retorna o resto da divisão. Se o resto da divisão por 2 for 0, o número é par; caso contrário, é ímpar.",refSolucao:v("par"),testes:[{input:["8"],expected:"par",tipo:"palavra",palavras:["par"],pontuacao:100},{input:["7"],expected:"ímpar",tipo:"palavra",palavras:["impar","ímpar","impar"],pontuacao:100},{input:["10"],expected:"par",tipo:"palavra",palavras:["par"],pontuacao:100},{input:["3"],expected:"ímpar",tipo:"palavra",palavras:["impar","ímpar"],pontuacaoBonus:!0}]},{id:18,titulo:"Maior número",nivel:"CONDICIONAIS",enunciado:"Receba dois números e informe qual é o maior.",descricao:"Use uma condição para comparar dois números e mostrar o maior. Se forem iguais, informe que são iguais.",conceitos:["if/elif/else","comparação"],entradaEsperada:"dois números",saidaEsperada:"o maior número",exemplos:[{rotulo:"Exemplo",entrada:`10
3`,saida:"10"}],dicas:["Compare os dois números com > e <.","Use else para o caso de serem iguais."],solucao:`a = int(input())
b = int(input())
if a > b:
    print(a)
elif b > a:
    print(b)
else:
    print("iguais")`,explicacao:"Comparamos os dois números. O maior é mostrado; se nenhum for maior, informamos que são iguais.",refSolucao:v(10),testes:[{input:["10","3"],expected:"10",tipo:"numero",pontuacao:100},{input:["3","10"],expected:"10",tipo:"numero",pontuacao:100},{input:["7","7"],expected:"iguais",tipo:"palavra",palavras:["igual","iguais","igual"],pontuacao:100},{input:["50","2"],expected:"50",tipo:"numero",pontuacaoBonus:!0}]},{id:19,titulo:"Aprovação",nivel:"CONDICIONAIS",enunciado:"Receba uma nota e informe a situação do aluno.",descricao:"Receba uma nota de 0 a 10 e informe: Aprovado (nota >= 7), Recuperação (nota >= 5 e < 7) ou Reprovado (nota < 5).",conceitos:["if/elif/else","comparações encadeadas"],entradaEsperada:"uma nota de 0 a 10",saidaEsperada:"Aprovado, Recuperação ou Reprovado",exemplos:[{rotulo:"Aprovado",entrada:"8",saida:"Aprovado"},{rotulo:"Recuperação",entrada:"6",saida:"Recuperação"},{rotulo:"Reprovado",entrada:"4",saida:"Reprovado"}],dicas:["Nota >= 7 → Aprovado.","Nota >= 5 e < 7 → Recuperação.","Nota < 5 → Reprovado."],solucao:`nota = float(input())
if nota >= 7:
    print("Aprovado")
elif nota >= 5:
    print("Recuperação")
else:
    print("Reprovado")`,explicacao:"Verificamos a nota em ordem: se for maior ou igual a 7 está aprovado; se for maior ou igual a 5 está de recuperação; senão está reprovado.",refSolucao:v("Aprovado"),testes:[{input:["8"],expected:"Aprovado",tipo:"palavra",palavras:["aprovado"],pontuacao:100},{input:["6"],expected:"Recuperação",tipo:"palavra",palavras:["recuperacao","recuperação"],pontuacao:100},{input:["4"],expected:"Reprovado",tipo:"palavra",palavras:["reprovado"],pontuacao:100},{input:["9.5"],expected:"Aprovado",tipo:"palavra",palavras:["aprovado"],pontuacao:100},{input:["2"],expected:"Reprovado",tipo:"palavra",palavras:["reprovado"],pontuacaoBonus:!0}]},{id:20,titulo:"Maioridade",nivel:"CONDICIONAIS",enunciado:"Receba a idade e informe se a pessoa é maior ou menor de idade.",descricao:"No Brasil, a maioridade é aos 18 anos. Receba a idade e informe se a pessoa é maior ou menor de idade.",conceitos:["if/else","comparação"],entradaEsperada:"a idade",saidaEsperada:"maior de idade ou menor de idade",exemplos:[{rotulo:"Maior",entrada:"20",saida:"maior de idade"},{rotulo:"Menor",entrada:"15",saida:"menor de idade"}],dicas:["Se a idade for maior ou igual a 18, a pessoa é maior de idade.","Caso contrário, é menor de idade."],solucao:`idade = int(input())
if idade >= 18:
    print("maior de idade")
else:
    print("menor de idade")`,explicacao:"Comparamos a idade com 18. Se for 18 ou mais, é maior de idade; se for menos, é menor de idade.",refSolucao:v("maior de idade"),testes:[{input:["20"],expected:"maior de idade",tipo:"palavra",palavras:["maior"],pontuacao:100},{input:["15"],expected:"menor de idade",tipo:"palavra",palavras:["menor"],pontuacao:100},{input:["18"],expected:"maior de idade",tipo:"palavra",palavras:["maior"],pontuacao:100},{input:["10"],expected:"menor de idade",tipo:"palavra",palavras:["menor"],pontuacaoBonus:!0}]},{id:21,titulo:"Contagem",nivel:"REPETIÇÃO",enunciado:"Crie um programa que conte de 1 até 10.",descricao:"Use um loop for com range(1, 11) para mostrar os números de 1 a 10, um em cada linha.",conceitos:["for","range()"],entradaEsperada:"",saidaEsperada:"1, 2, 3, ..., 10 (um por linha)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:`1
2
3`}],dicas:["range(1, 11) gera os números de 1 até 10.","Use for i in range(1, 11): print(i).","Lembre-se: range para antes do último número."],solucao:`for i in range(1, 11):
    print(i)
# range(1, 11) gera os números de 1 a 10.`,explicacao:"O loop for repete o código para cada valor gerado por range(). range(1, 11) gera 1, 2, 3 ... até 10, e cada um é mostrado.",refSolucao:`1
2
3
4
5
6
7
8
9
10`,testes:[{input:[],expected:`1
2
3
4
5
6
7
8
9
10`,tipo:"sequencia",pontuacao:100}]},{id:22,titulo:"Tabuada",nivel:"REPETIÇÃO",enunciado:"Receba um número e apresente sua tabuada de 1 a 10.",descricao:"Receba um número e mostre a tabuada dele, multiplicando de 1 até 10. Cada linha deve mostrar a multiplicação e o resultado.",conceitos:["for","range()","f-string"],entradaEsperada:"um número",saidaEsperada:"a tabuada do número (1× até 10×)",exemplos:[{rotulo:"Exemplo",entrada:"2",saida:`2 x 1 = 2
2 x 2 = 4`}],dicas:["Use um for de 1 a 10.",'Em cada volta, mostre algo como f"{n} x {i} = {n*i}".'],solucao:`n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")`,explicacao:"O loop for percorre os multiplicadores de 1 a 10. Em cada volta, multiplicamos o número pelo multiplicador e mostramos a linha da tabuada.",refSolucao:"7 x 1 = 7",testes:[{input:["7"],expected:["7 x 1 = 7","7 x 2 = 14","7 x 3 = 21","7 x 4 = 28","7 x 5 = 35","7 x 6 = 42","7 x 7 = 49","7 x 8 = 56","7 x 9 = 63","7 x 10 = 70"],tipo:"tabuada",pontuacao:100},{input:["3"],expected:["3 x 1 = 3","3 x 2 = 6","3 x 3 = 9","3 x 4 = 12","3 x 5 = 15","3 x 6 = 18","3 x 7 = 21","3 x 8 = 24","3 x 9 = 27","3 x 10 = 30"],tipo:"tabuada",pontuacao:100}]},{id:23,titulo:"Soma de números",nivel:"REPETIÇÃO",enunciado:"Crie um programa que some números de 1 até 100.",descricao:"Use um loop para somar todos os números de 1 até 100 e mostre o total. O resultado é 5050.",conceitos:["for","range()","acumulador"],entradaEsperada:"",saidaEsperada:"5050 (a soma de 1 a 100)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"5050"}],dicas:["Crie uma variável soma = 0 antes do loop.","Dentro do loop, faça soma = soma + i.","Depois do loop, mostre soma."],solucao:`soma = 0
for i in range(1, 101):
    soma = soma + i
print(soma)
# A variável soma acumula todos os valores.`,explicacao:"Usamos uma variável acumuladora. Antes do loop ela vale 0; dentro do loop somamos cada número a ela. Ao final, soma contém o total.",refSolucao:v(5050),testes:[{input:[],expected:"5050",tipo:"numero",pontuacao:100}]},{id:24,titulo:"Contagem regressiva",nivel:"REPETIÇÃO",enunciado:"Crie uma contagem regressiva de 10 até 0.",descricao:"Use um loop para mostrar os números de 10 até 0, um em cada linha.",conceitos:["for","range() com passo negativo"],entradaEsperada:"",saidaEsperada:"10, 9, 8, ..., 0 (um por linha)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:`10
9
8`}],dicas:["range(10, -1, -1) gera os números de 10 até 0.","O terceiro valor do range é o passo (-1 para contar para trás)."],solucao:`for i in range(10, -1, -1):
    print(i)
# O passo -1 faz a contagem regressiva.`,explicacao:"O range(10, -1, -1) começa em 10, para antes de -1 (ou seja, até 0) e diminui 1 a cada passo, criando a contagem regressiva.",refSolucao:`10
9
8
7
6
5
4
3
2
1
0`,testes:[{input:[],expected:`10
9
8
7
6
5
4
3
2
1
0`,tipo:"sequencia",pontuacao:100}]},{id:25,titulo:"Números pares",nivel:"REPETIÇÃO",enunciado:"Mostre os números pares de 1 até 20.",descricao:"Mostre todos os números pares entre 1 e 20 (2, 4, 6, ..., 20), um em cada linha.",conceitos:["for","range() com passo","operador %"],entradaEsperada:"",saidaEsperada:"2, 4, 6, ..., 20 (um por linha)",exemplos:[{rotulo:"Exemplo",entrada:"",saida:`2
4
6`}],dicas:["Use range(2, 21, 2) que gera apenas os números pares.","Ou use um for de 1 a 20 e teste com i % 2 == 0."],solucao:`for i in range(2, 21, 2):
    print(i)
# O passo 2 faz o range pular de 2 em 2, gerando só pares.`,explicacao:"O range(2, 21, 2) começa em 2 e aumenta de 2 em 2 até antes de 21, gerando apenas os números pares de 2 a 20.",refSolucao:`2
4
6
8
10
12
14
16
18
20`,testes:[{input:[],expected:`2
4
6
8
10
12
14
16
18
20`,tipo:"sequencia",pontuacao:100}]},{id:26,titulo:"Fatorial",nivel:"LÓGICA",enunciado:"Receba um número e calcule seu fatorial.",descricao:"O fatorial de um número n (escrito n!) é o produto de todos os números de 1 até n. Por exemplo, 5! = 5 × 4 × 3 × 2 × 1 = 120.",conceitos:["for","loop","acumulador"],entradaEsperada:"um número inteiro",saidaEsperada:"o fatorial do número",exemplos:[{rotulo:"Exemplo",entrada:"5",saida:"120"}],dicas:["Crie uma variável fatorial = 1.","Multiplique pelos números de 1 até n.","Para 5: 1×2×3×4×5 = 120."],solucao:`n = int(input())
fatorial = 1
for i in range(1, n + 1):
    fatorial = fatorial * i
print(fatorial)`,explicacao:"Começamos com fatorial = 1 e multiplicamos por cada número de 1 até n. O resultado é o produto de todos esses números, ou seja, o fatorial.",refSolucao:v(120),testes:[{input:["5"],expected:"120",tipo:"numero",pontuacao:100},{input:["3"],expected:"6",tipo:"numero",pontuacao:100},{input:["7"],expected:"5040",tipo:"numero",pontuacao:100},{input:["4"],expected:"24",tipo:"numero",pontuacaoBonus:!0}]},{id:27,titulo:"Média de uma lista",nivel:"LÓGICA",enunciado:"Crie uma lista de números e calcule sua média.",descricao:"Crie uma lista com alguns números, some todos os elementos e divida pela quantidade de elementos para achar a média.",conceitos:["listas","sum()","len()"],entradaEsperada:"",saidaEsperada:"a média dos números da lista",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"5.0"}],dicas:["Use sum(lista) para somar e len(lista) para o número de elementos.","A média é sum(lista) / len(lista)."],solucao:`numeros = [2, 4, 6, 8]
media = sum(numeros) / len(numeros)
print(media)
# sum somas, len conta. A média é soma dividida pela quantidade.`,explicacao:"A função sum() soma todos os elementos da lista e len() conta quantos elementos existem. Dividimos a soma pela quantidade para obter a média.",refSolucao:v(5),testes:[{input:[],expected:"5.0",tipo:"numeroF",pontuacao:100},{input:[],expected:"6.0",tipo:"numeroF",pontuacaoBonus:!0}]},{id:28,titulo:"Maior número da lista",nivel:"LÓGICA",enunciado:"Crie uma lista e descubra qual é o maior número.",descricao:"Crie uma lista de números e descubra qual é o maior. Você pode usar a função max() ou um loop para comparar os valores.",conceitos:["listas","max()","comparação"],entradaEsperada:"",saidaEsperada:"o maior número da lista",exemplos:[{rotulo:"Exemplo",entrada:"",saida:"42"}],dicas:["Use max(lista) para achar o maior número.","Ou faça um loop comparando cada valor."],solucao:`numeros = [10, 3, 42, 7, 15]
maior = max(numeros)
print(maior)
# max() retorna o maior valor da lista.`,explicacao:"A função max() percorre a lista e retorna o maior número encontrado.",refSolucao:v(42),testes:[{input:[],expected:"42",tipo:"numero",pontuacao:100},{input:[],expected:"99",tipo:"numero",pontuacaoBonus:!0}]},{id:29,titulo:"Contar vogais",nivel:"LÓGICA",enunciado:"Receba uma palavra e conte quantas vogais ela possui.",descricao:"Receba uma palavra e conte quantas letras são vogais (a, e, i, o, u). Considere também as letras maiúsculas e acentuadas.",conceitos:["loops","strings","condicionais"],entradaEsperada:"uma palavra",saidaEsperada:"a quantidade de vogais",exemplos:[{rotulo:"Exemplo",entrada:"programacao",saida:"5"}],dicas:["Percorra cada letra da palavra com um for.",'Use uma lista de vogais para verificar: "aeiouAEIOU".',"Incremente um contador a cada vogal encontrada."],solucao:`palavra = input()
qtd = 0
vogais = "aeiouAEIOUáéíóúÁÉÍÓÚ"
for letra in palavra:
    if letra in vogais:
        qtd = qtd + 1
print(qtd)`,explicacao:"Percorremos cada letra da palavra com um for. Para cada letra, verificamos se ela está na lista de vogais; se sim, aumentamos o contador.",refSolucao:v(5),testes:[{input:["programacao"],expected:"5",tipo:"numero",pontuacao:100},{input:["python"],expected:"1",tipo:"numero",pontuacao:100},{input:["abc"],expected:"1",tipo:"numero",pontuacao:100},{input:["aeiou"],expected:"5",tipo:"numero",pontuacaoBonus:!0},{input:["olá"],expected:"2",tipo:"numero",pontuacaoBonus:!0}]},{id:30,titulo:"Desafio final",nivel:"LÓGICA",enunciado:"Crie um pequeno programa que reúna seus conhecimentos: solicite o nome, solicite três notas, calcule a média, informe a situação e apresente uma mensagem personalizada.",descricao:"Combine tudo o que aprendeu: input(), variáveis, cálculo de média, condicionais e mensagens personalizadas. Regra: média >= 7 Aprovado, >= 5 Recuperação, senão Reprovado.",conceitos:["input()","variáveis","média","condicionais","strings"],entradaEsperada:"nome e três notas",saidaEsperada:"a média e a situação do aluno",exemplos:[{rotulo:"Exemplo",entrada:`Maria
7
8
9`,saida:"Média: 8.0 - Aprovado"}],dicas:["Receba o nome e as três notas.","Calcule a média com (n1+n2+n3)/3.","Use if/elif/else para a situação.","Mostre uma mensagem com o nome e a média."],solucao:`nome = input()
n1 = float(input())
n2 = float(input())
n3 = float(input())
media = (n1 + n2 + n3) / 3
if media >= 7:
    situacao = "Aprovado"
elif media >= 5:
    situacao = "Recuperação"
else:
    situacao = "Reprovado"
print(f"{nome}, sua média é {media:.1f} - {situacao}")`,explicacao:"Este desafio junta vários conceitos: recebemos dados com input(), calculamos a média, usamos condicionais para a situação e criamos uma mensagem personalizada com f-string.",refSolucao:"Média: 8.0 - Aprovado",testes:[{input:["Maria","7","8","9"],expected:"8.0",tipo:"contemMedia",notaFinal:"Aprovado",pontuacao:100},{input:["João","5","5","7"],expected:"5.7",tipo:"contemMedia",notaFinal:"Recuperação",pontuacao:100},{input:["Ana","3","4","2"],expected:"3.0",tipo:"contemMedia",notaFinal:"Reprovado",pontuacao:100}]}],Z=[{id:"primeiro",icone:"🏆",titulo:"Primeiro Código",descricao:"Resolveu seu primeiro desafio.",condicao:e=>e.concluidos>=1},{id:"cinco",icone:"🏆",titulo:"5 Desafios",descricao:"Completou 5 desafios.",condicao:e=>e.concluidos>=5},{id:"loops",icone:"🏆",titulo:"Mestre dos Loops",descricao:"Completou todos os desafios de repetição.",condicao:e=>_(e,4)},{id:"logica",icone:"🏆",titulo:"Lógica Python",descricao:"Completou os desafios de lógica.",condicao:e=>_(e,5)},{id:"master",icone:"🏆",titulo:"Python Code Master",descricao:"Completou os 30 desafios.",condicao:e=>e.concluidos>=30}];function _(e,a){var t;const o=((t=$.find(r=>r.id===a))==null?void 0:t.faixa)||[0,0];for(let r=o[0];r<=o[1];r++)if(!e.resolvidos.includes(r))return!1;return!0}function pe(e){for(const a of $)if(e>=a.faixa[0]&&e<=a.faixa[1])return a;return $[0]}const Q="desafio-python-code-progresso-v1",U=()=>({resolvidos:[],tentativas:{},dicasUsadas:{},pontosDesafios:{},pontuacao:0,conquistas:[],codigos:{},ultimoDesafio:1,criadoEm:Date.now()});function me(){try{const e=localStorage.getItem(Q);if(!e)return U();const a=JSON.parse(e),o=U();for(const t in o)a[t]===void 0&&(a[t]=o[t]);return a}catch{return U()}}function R(e){try{localStorage.setItem(Q,JSON.stringify(e))}catch{}return e}function fe(e,a){const o=e.tentativas[a]||0;return e.tentativas[a]=o+1,R(e),e.tentativas[a]}async function ve(e,a,o){e.resolvidos.includes(a)||e.resolvidos.push(a);const t=e.pontosDesafios[a]||0;return e.pontosDesafios[a]=Math.max(t,o),e.pontuacao=ge(e),R(e),e}function ge(e){let a=0;for(const o in e.pontosDesafios)a+=e.pontosDesafios[o]||0;return a}function H(e,a){return e.dicasUsadas[a]=!0,R(e),e}function xe(e,a){return e.conquistas.includes(a)?!1:(e.conquistas.push(a),R(e),!0)}function he(){const e=U();return R(e),e}function I(e,a){const o=e.resolvidos.length,t=a?Math.round(o/a*100):0,r=Object.keys(e.tentativas).length;return{concluidos:o,percentual:t,pontuacao:e.pontuacao,tentativas:Object.values(e.tentativas).reduce((n,s)=>n+s,0),desafiosComTentativa:r,ultimoDesafio:e.ultimoDesafio}}function ee(e,a){return e.codigos[a]||""}function be(e,a){e.ultimoDesafio=a,R(e)}function A(e){return e==null?"":String(e).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function V(e){return String(e||"").split(/\r?\n/).map(a=>a.trim()).filter(a=>a.length>0)}function C(e){const a=[],o=/-?\d+(?:[.,]\d+)?/g;let t;for(;(t=o.exec(String(e||"")))!==null;){const r=t[0].replace(",",".");a.push(parseFloat(r))}return a}function Ee(e,a){const o=Array.isArray(a)?a:[a],t=String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().split(/[^a-z0-9à-ú]/gi).filter(n=>n.length>0),r=o.map(A);return t.some(n=>r.includes(n))}function G(e,a){return a.some(o=>Ee(e,o))}function y(e,a,o=.001){return Math.abs(e-a)<=o}function Se(e){return{...e,expected:Array.isArray(e.expected)?e.expected:String(e.expected)}}function W(e,a){const o=Se(e),t=o.tipo||"exato",r=String(a||""),n=V(r);switch(t){case"exato":{const s=String(o.expected).trim(),i=A(r),u=A(s);return o.ignoreCase?i===u:r.trim()===s}case"numero":{const s=parseFloat(o.expected);return Number.isNaN(s)?!1:C(r).some(i=>y(i,s,1e-4))}case"numeroF":{const s=parseFloat(o.expected);return Number.isNaN(s)?!1:C(r).some(i=>y(i,s,.01))}case"numeros":{const s=o.expected.map(u=>parseFloat(u)),i=C(r);return s.every(u=>i.some(c=>y(c,u,1e-4)))}case"doisNumeros":{const s=o.expected.map(u=>parseFloat(u)),i=C(r);if(s.length===2&&i.length>=2){const[u,c]=s,p=[...i],m=p.findIndex(l=>y(l,u,1e-4));return m===-1?!1:(p.splice(m,1),p.some(l=>y(l,c,1e-4)))}return s.every(u=>i.some(c=>y(c,u,1e-4)))}case"palavra":return G(r,o.palavras||[o.expected]);case"texto":return o.minLen?A(r).length>=o.minLen:n.length>0;case"contemNome":{const s=Array.isArray(o.expected)?o.expected:[o.expected],i=A(r),u=A(r.replace(/\s+/g," "));return s.every(c=>{const p=A(c);return i.includes(p)||u.includes(p)})}case"contemMedia":{const s=parseFloat(o.expected);if(!C(r).some(m=>y(m,s,.05)))return!1;if(!o.notaFinal)return!0;const p={Aprovado:["aprovado"],Recuperação:["recuperacao"],Recuperacaoo:["recuperacao"],Reprovado:["reprovado"]}[o.notaFinal]||[o.notaFinal];return G(r,p)}case"sequencia":{const s=String(o.expected).trim().split(/\s+/).map(u=>parseInt(u,10)),i=C(r).map(u=>Math.trunc(u));return s.length!==i.length?!1:s.every((u,c)=>u===i[c])}case"tabuada":{const s=o.expected,i=V(r),u={};let c=null;for(const p of i){const m=C(p);if(m.length<3)return!1;const[l,x,h]=m.map(M=>Math.trunc(M));if(l*x!==h)return!1;if(c===null)c=l;else if(c!==l)return!1;u[x]=h}if(i.length<9)return!1;for(const p of s){const m=String(p),l=C(m);if(l.length>=3){const[x]=l;for(let h=1;h<=10;h++)if(u[h]===void 0||u[h]!==x*h)return!1;return!0}}return!1}case"regex":return o.regra?o.regra.test(r):!1;default:return r.trim()===String(o.expected).trim()}}function Ce(e,a){const o=e.testes||[],t={},r=[];o.forEach((l,x)=>{const h=a[x]||{ok:!1,output:""};l.pontuacaoBonus,l.pontuacaoBonus?r.push({teste:l,dados:h}):t[x]={teste:l,dados:h}});const n=Object.entries(t).map(([l,x])=>{const h=x.dados.ok&&W(x.teste,x.dados.output);return{indice:parseInt(l,10),ok:h}}),s=n.filter(l=>l.ok).length,i=n.length,u=s===i&&i>0,c=r.map(({teste:l,dados:x})=>({ok:x.ok&&W(l,x.output)})),p=c.filter(l=>l.ok).length*10;let m=null;for(const{indice:l,ok:x}of n)if(!x){m={indice:l,dados:t[l].dados,teste:t[l].teste};break}return{correto:u,obrigatorios:i,corretos:s,pontosBonus:p,erroDoPrimeiro:m,detalhesObrigatorios:n,detalhesBonus:c}}function qe(e,a){let o=25;return e===0?o=100:e===1?o=75:o=50,a&&(o=25),o}const ye="https://cdn.jsdelivr.net/pyodide/v314.0.4/full/";let E=null,b=null,P=null,D=null,q=null,F=null;function Oe(){const e=new Worker(new URL("/desafio-python-code-web/assets/python-worker-DXHgojpm.js",import.meta.url),{type:"module"});return e.onmessage=a=>{const{type:o,id:t}=a.data||{};if(o==="loaded")E=e,b&&b.resolve();else if(o==="result"){if(D){const r=D;D=null,clearTimeout(F),r(a.data.payload&&a.data.payload.dados?a.data.payload.dados:[])}}else if(o==="error"){const r=a.data.message||"Erro interno";if(q){const n=q;q=null,clearTimeout(F),n(new Error(r))}else b&&!E&&b.reject(new Error(r))}else o==="detail"&&window.dispatchEvent(new CustomEvent("py-runner-note",{detail:a.data.message}))},e.onerror=a=>{const o=a&&a.message||"O Python falhou e foi reiniciado. Tente novamente.";if(q){const t=q;q=null,clearTimeout(F),t(new Error(o))}else b&&!E&&b.reject(new Error(o));E=null},e}function oe(){return b?b.promise:P||(P=(async()=>{Oe().postMessage({type:"init",indexURL:ye}),b={},b.promise=new Promise((o,t)=>{b.resolve=o,b.reject=t});const a=setTimeout(()=>{b&&b.reject(new Error("timeout-pyodide")),z()},45e3);try{return await b.promise,clearTimeout(a),!0}catch(o){throw clearTimeout(a),z(),o}})(),P)}function z(){if(E){try{E.terminate()}catch{}E=null}P=null,b=null}async function Ae(e,a,o=7e3){if(E||await oe(),!E)throw new Error("O Python ainda não terminou de carregar. Aguarde e tente novamente.");const t=E;return new Promise((r,n)=>{D=r,q=n,F=setTimeout(()=>{D=null,q=null,z(),n(new Error("timeout"))},o),t.postMessage({type:"run",code:e,inputs:a})}).catch(r=>{throw r&&r.message==="timeout"?Object.assign(new Error("Seu código demorou demais para terminar (tempo esgotado)."),{kind:"timeout"}):r})}const $e=new Set(["and","as","assert","async","await","break","class","continue","def","del","elif","else","except","False","finally","for","from","global","if","import","in","is","lambda","None","nonlocal","not","or","pass","raise","return","True","try","while","with","yield"]),Ie=new Set(["print","input","int","float","str","len","range","sum","max","min","abs","round","list","tuple","dict","set","bool","type","format","enumerate","zip","sorted","reversed","map","filter","input","open"]);function Re(e){return String(e).split(`
`).map(o=>Pe(o)).join(`
`)}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pe(e){if(e.trim()==="")return"";const a=/(#.*?$)|("""[\s\S]*?"""|'''[\s\S]*?''')|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b/g;let o="",t=0,r;for(;(r=a.exec(e))!==null;){r.index>t&&(o+=S(e.slice(t,r.index)));const[n,s,i,u,c,p]=r;if(s!==void 0)o+=`<span class="tok-com">${S(s)}</span>`;else if(u!==void 0)o+=`<span class="tok-str">${S(u)}</span>`;else if(c!==void 0)o+=`<span class="tok-num">${S(c)}</span>`;else if(p!==void 0){const m=p;$e.has(m)?o+=`<span class="tok-kw">${S(m)}</span>`:Ie.has(m)?o+=`<span class="tok-fn">${S(m)}</span>`:o+=`<span class="tok-pl">${S(m)}</span>`}else o+=S(n);t=r.index+n.length}return t<e.length&&(o+=S(e.slice(t))),o}function T(e){const a=e.querySelector("textarea.code-input"),o=e.querySelector(".code-highlight"),t=e.querySelector(".code-lines");if(!a||!o||!t)return;const r=a.value;o.innerHTML=Re(r)+`
`;const n=r.split(`
`).length;let s="";for(let i=1;i<=n;i++)s+=`<span>${i}</span>`;t.innerHTML=s+"<span></span>",o.scrollTop=a.scrollTop,o.scrollLeft=a.scrollLeft,t.scrollTop=a.scrollTop}async function ae(e,a){const o=e.querySelector("textarea.code-input"),t=e.querySelector(".code-highlight"),r=e.querySelector(".code-lines");o&&(o.value=a||"# Digite seu código aqui",T(e),o.addEventListener("scroll",()=>{t.scrollTop=o.scrollTop,t.scrollLeft=o.scrollLeft,r.scrollTop=o.scrollTop}),o.addEventListener("input",()=>T(e)),o.addEventListener("keydown",n=>{if(n.key==="Tab"){n.preventDefault();const s=o.selectionStart,i=o.selectionEnd;o.value=o.value.slice(0,s)+"    "+o.value.slice(i),o.selectionStart=o.selectionEnd=s+4,T(e);return}if(n.key==="Enter"){n.preventDefault();const s=o.selectionStart,i=o.value.slice(0,s).split(`
`).pop();let c=`
`+(i.match(/^[ \t]*/)||[""])[0];/:\s*$/.test(i)&&(c+="    "),i.trim()===""&&(c=""),o.value=o.value.slice(0,s)+c+o.value.slice(s),o.selectionStart=o.selectionEnd=s+c.length,T(e)}}),o.addEventListener("focus",()=>o.parentElement.classList.add("focado")),o.addEventListener("blur",()=>o.parentElement.classList.remove("focado")))}function te(e){const a=e.querySelector("textarea.code-input");return a?a.value:""}const X=Object.freeze(Object.defineProperty({__proto__:null,atualizarEditor:T,criarEditor:ae,obterCodigo:te},Symbol.toStringTag,{value:"Module"})),O=document.getElementById("app"),J=me();let d={progresso:J,desafioAtual:J.ultimoDesafio,dicaVista:!1,executando:!1,carregando:!1};const g=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function w(e,a="info",o=3200){let t=document.querySelector(".toast");t||(t=document.createElement("div"),t.className="toast",document.body.appendChild(t)),t.textContent=e,t.className=`toast toast-${a} mostrar`,clearTimeout(t._t),t._t=setTimeout(()=>t.classList.remove("mostrar"),o)}async function Te(){if(!d.carregando)return!0;try{return await d.carregando,!0}catch{return!1}}function re(e){return pe(e)}function Ne(){return`
  <div class="python-loading" id="python-loading">
    <div class="pl-snake">🐍</div>
    <div class="pl-bar"><div class="pl-fill"></div></div>
    <p>Carregando Python para executar seu código...</p>
  </div>`}function De(){const e=I(d.progresso,f.length),a=f.find(r=>!d.progresso.resolvidos.includes(r.id))||f[0],o=re(d.desafioAtual),t=e.percentual;return`
  <section class="page home">
    <div class="hero">
      <div class="hero-icone">🐍</div>
      <h1>Desafio Python Code</h1>
      <p class="hero-sub">Aprenda Python praticando!</p>
      <p class="hero-texto">Resolva desafios de programação, escreva seu código e descubra imediatamente se sua solução está correta.</p>
      <button class="btn btn-principal btn-grande" data-acao="abrir-desafio" data-id="${a.id}">
        COMEÇAR DESAFIO
      </button>
      <button class="btn btn-secundario" data-acao="abrir-aleatorio">
        🎲 DESAFIO ALEATÓRIO
      </button>
    </div>

    <div class="cards">
      <div class="card card-progresso" data-acao="navegar" data-rota="#/progresso">
        <div class="card-rotulo">Progresso</div>
        <div class="card-valor">${e.concluidos} / ${f.length} desafios concluídos</div>
        <div class="barra-progresso">
          <div class="barra-fill" style="width:${t}%"></div>
        </div>
        <div class="card-extra">${t}% concluído</div>
      </div>
      <div class="card card-nivel">
        <div class="card-rotulo">Nível atual</div>
        <div class="card-valor card-nivel-valor">
          <span class="nivel-icone">${o.icone}</span> ${o.nome}
        </div>
        <div class="card-extra">Desafios ${o.faixa[0]}–${o.faixa[1]}</div>
      </div>
      <div class="card card-pontos">
        <div class="card-rotulo">Pontuação</div>
        <div class="card-valor">🏆 ${e.pontuacao} pts</div>
        <div class="card-extra">Tentativas: ${e.tentativas}</div>
      </div>
    </div>
  </section>`}function Le(){return`
  <section class="page desafios">
    <h2 class="page-titulo">Desafios</h2>
    <p class="page-sub">Escolha um desafio para praticar. Eles seguem uma ordem pedagógica.</p>
    ${$.map(a=>({nivel:a,itens:f.filter(o=>o.id>=a.faixa[0]&&o.id<=a.faixa[1])})).map(a=>`
      <div class="nivel-bloco">
        <div class="nivel-cabecalho" style="--cor:${a.nivel.cor}">
          <span class="nivel-icone">${a.nivel.icone}</span>
          <div>
            <strong>${a.nivel.nome}</strong>
            <span class="nivel-faixa">Desafios ${a.nivel.faixa[0]}–${a.nivel.faixa[1]}</span>
          </div>
        </div>
        <div class="lista-desafios">
          ${a.itens.map(o=>{const t=d.progresso.resolvidos.includes(o.id)?"ok":"";return`
            <button class="item-desafio ${t}" data-acao="abrir-desafio" data-id="${o.id}">
              <span class="item-numero">${String(o.id).padStart(2,"0")}</span>
              <span class="item-info">
                <strong>${g(o.titulo)}</strong>
                <small>${g(o.conceitos.join(" · "))}</small>
              </span>
              <span class="item-status">${t?"✅":"▶"}</span>
            </button>`}).join("")}
        </div>
      </div>`).join("")}
  </section>`}function we(e){return`
  <div class="exemplo-card">
    ${e.rotulo?`<div class="exemplo-rotulo">${g(e.rotulo)}</div>`:""}
    ${e.entrada?`<div class="exemplo-linha"><span class="tag">Entrada</span><code>${g(e.entrada)}</code></div>`:""}
    ${e.saida?`<div class="exemplo-linha"><span class="tag">Resultado esperado</span><code>${g(e.saida)}</code></div>`:""}
  </div>`}function Me(e){const a=f.find(u=>u.id===e);if(!a)return'<section class="page"><p>Desafio não encontrado.</p></section>';const o=re(e),t=I(d.progresso,f.length);ee(d.progresso,e);const r=d.progresso.resolvidos.includes(e),n=e>1?e-1:null,s=e<f.length?e+1:null,i=a.testes[0];return i&&i.input.join(" · "),d.dicaVista=!1,d.desafioAtual=e,be(d.progresso,e),`
  <section class="page desafio">
    <div class="desafio-topo">
      <button class="icon-btn" data-acao="navegar" data-rota="#/desafios" title="Voltar aos desafios">←</button>
      <div class="desafio-header">
        <div class="chip-nivel" style="--cor:${o.cor}">${o.icone} ${o.nome}</div>
        <div class="desafio-contador">Desafio ${e} de ${f.length}
          <span class="barra-mini"><span style="width:${(e/f.length*100).toFixed(0)}%"></span></span>
        </div>
        <h2>${g(a.titulo)}</h2>
      </div>
      ${r?'<div class="selo-ok">✅ Concluído</div>':""}
    </div>

    <div class="area-desafio">
      <h3>Área do desafio</h3>
      <p class="enunciado">${g(a.enunciado)}</p>
      <p class="descricao">${g(a.descricao)}</p>
      <div class="conceitos">
        ${a.conceitos.map(u=>`<span class="chip-conceito">${g(u)}</span>`).join("")}
      </div>

      <h3>Exemplo</h3>
      ${a.exemplos.map(we).join("")}
    </div>

    <div class="editor-wrap">
      <div class="editor-cabecalho">
        <h3>Seu código</h3>
        <span class="editor-dica">Tab = indentação · Ctrl+Enter = executar</span>
      </div>
      <div class="editor-corpo">
        <div class="code-lines" aria-hidden="true"></div>
        <div class="code-stack">
          <pre class="code-highlight" aria-hidden="true"></pre>
          <textarea class="code-input" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Editor de código Python"></textarea>
        </div>
      </div>
      <div class="editor-botoes">
        <button class="btn btn-principal btn-executar" data-acao="executar" id="btn-executar">▶ EXECUTAR CÓDIGO</button>
        <button class="btn btn-limpar" data-acao="limpar">🧹 LIMPAR</button>
        <button class="btn btn-reset" data-acao="resetar">↺ RESETAR</button>
      </div>
    </div>

    <div id="area-resultado"></div>

    <div class="desafio-nav">
      ${n?`<button class="btn btn-nav" data-acao="abrir-desafio" data-id="${n}">← DESAFIO ANTERIOR</button>`:"<span></span>"}
      ${s?`<button class="btn btn-principal" data-acao="abrir-desafio" data-id="${s}">PRÓXIMO DESAFIO →</button>`:"<span></span>"}
    </div>
    <div class="desafio-rodape-info">
      ${t.concluidos} / ${f.length} desafios concluídos · ${t.pontuacao} pts
    </div>

    <div id="python-loading-placeholder" style="display:none"></div>
  </section>`}function Ue(){const e=I(d.progresso,f.length),a=$.map(o=>{const t=f.filter(s=>s.id>=o.faixa[0]&&s.id<=o.faixa[1]),r=t.filter(s=>d.progresso.resolvidos.includes(s.id)).length,n=Math.round(r/t.length*100);return`
    <div class="nivel-progresso">
      <div class="np-cab">
        <span style="color:${o.cor}">${o.icone} ${o.nome}</span>
        <strong>${r}/${t.length}</strong>
      </div>
      <div class="barra-progresso"><div class="barra-fill" style="width:${n}%;background:${o.cor}"></div></div>
    </div>`}).join("");return`
  <section class="page progresso">
    <h2 class="page-titulo">📊 Meu Progresso</h2>
    <div class="mini-cards">
      <div class="mini-card"><div class="mc-valor">${e.concluidos}</div><div class="mc-rotulo">Desafios concluídos</div></div>
      <div class="mini-card"><div class="mc-valor">${e.percentual}%</div><div class="mc-rotulo">Concluído</div></div>
      <div class="mini-card"><div class="mc-valor">🏆 ${e.pontuacao}</div><div class="mc-rotulo">Pontuação</div></div>
      <div class="mini-card"><div class="mc-valor">${e.tentativas}</div><div class="mc-rotulo">Tentativas</div></div>
    </div>
    <h3>Por nível</h3>
    ${a}
    <div class="progresso-acoes">
      <button class="btn btn-principal" data-acao="abrir-desafio" data-id="${d.desafioAtual}">Continuar aprendendo →</button>
      <button class="btn btn-secundario" data-acao="navegar" data-rota="#/conquistas">Ver conquistas</button>
    </div>
  </section>`}function Fe(){const e=Z.map(t=>{const r=t.condicao(d.progresso);return`
    <div class="conquista ${r?"ganha":"bloqueada"}">
      <div class="cq-icone">${r?t.icone:"🔒"}</div>
      <strong>${g(t.titulo)}</strong>
      <p>${g(t.descricao)}</p>
    </div>`}).join(""),a=[];for(const t of $){const r=f.filter(s=>s.id>=t.faixa[0]&&s.id<=t.faixa[1]),n=r.filter(s=>d.progresso.resolvidos.includes(s.id)).length;a.push(`${t.icone} ${t.nome}: ${n}/${r.length}`)}return`
  <section class="page conquistas">
    <h2 class="page-titulo">🏆 Conquistas</h2>
    ${d.progresso.resolvidos.length>=f.length?`<div class="banner-final"><div class="bf-icone">🏆</div><h3>DESAFIO PYTHON CODE CONCLUÍDO!</h3><p>Parabéns! Você concluiu os ${f.length} desafios de Python.</p></div>`:""}
    <div class="conquistas-grid">
      ${e}
    </div>
    <h3>Progresso por nível</h3>
    ${a.map(t=>`<div class="nivel-chip">${t}</div>`).join("")}
  </section>`}const ze=[{icone:"🖨️",titulo:"print()",oque:"Serve para mostrar informações na tela.",exemplo:'print("Olá!")',resultado:"Olá!",como:"Escreva o que você quer mostrar dentro dos parênteses. Texto vai entre aspas."},{icone:"⌨️",titulo:"input()",oque:"Serve para receber dados digitados pelo usuário. Sempre devolve texto.",exemplo:"nome = input()",resultado:"O usuário digita algo e fica guardado na variável nome.",como:"Se precisar de número, use int(input()) ou float(input()) para transformar o texto em número."},{icone:"📦",titulo:"variáveis",oque:"Caixinhas que guardam valores, como números e textos.",exemplo:`idade = 17
print(idade)`,resultado:"17",como:"Use um nome e o sinal = para guardar um valor. Exemplo: idade = 17."},{icone:"🔤",titulo:"strings",oque:"Strings são textos em Python. Sempre ficam entre aspas.",exemplo:`nome = "Maria"
print(nome)`,resultado:"Maria",como:`string = texto. Use aspas simples ou duplas: "oi" ou 'oi'.`},{icone:"🔢",titulo:"números",oque:"Python trabalha com inteiros (int) e decimais (float).",exemplo:`x = 5
y = 2.5
print(x + y)`,resultado:"7.5",como:"Inteiros não têm vírgula. Decimais usam ponto: 2.5. Você pode fazer contas com eles."},{icone:"➗",titulo:"operadores",oque:"Símbolos para fazer contas: + soma, - subtrai, * multiplica, / divide.",exemplo:"print(2 + 3 * 4)",resultado:"14",como:"A ordem das contas é: parênteses, multiplicação/divisão, depois soma/subtração. Use parênteses para mudar a ordem."},{icone:"🔀",titulo:"if",oque:"Executa um bloco de código somente se a condição for verdadeira.",exemplo:`if idade >= 18:
    print("maior")`,resultado:"maior (se idade for 18+)",como:"Escreva if seguido da condição e dois pontos (:). O código dentro do if deve estar com indentação (4 espaços)."},{icone:"↩️",titulo:"else",oque:"Executa um bloco quando a condição do if for falsa.",exemplo:`if nota >= 7:
    print("aprovado")
else:
    print("reprovado")`,resultado:"aprovado ou reprovado",como:"O else vem depois do if, sem condição. Ele roda quando o if não é verdadeiro."},{icone:"🔣",titulo:"elif",oque:"Permite testar várias condições em sequência (senão se...).",exemplo:`if n > 0:
    print("positivo")
elif n < 0:
    print("negativo")
else:
    print("zero")`,resultado:"positivo / negativo / zero",como:"Use elif entre o if e o else para testar mais possibilidades."},{icone:"🔁",titulo:"for",oque:"Repete um bloco de código um número definido de vezes.",exemplo:`for i in range(3):
    print(i)`,resultado:`0
1
2`,como:"O for percorre uma sequência. range(n) gera de 0 até n-1."},{icone:"♾️",titulo:"while",oque:"Repete enquanto uma condição for verdadeira.",exemplo:`i = 0
while i < 3:
    print(i)
    i = i + 1`,resultado:`0
1
2`,como:"Cuidado: se a condição nunca virar falsa, o loop roda para sempre. Sempre atualize algo dentro do loop."},{icone:"📋",titulo:"listas",oque:"Guardam vários valores juntos, em ordem.",exemplo:`frutas = ["maçã", "banana"]
print(frutas[0])`,resultado:"maçã",como:"Crie com colchetes [ ]. O primeiro item está na posição 0. Use índice para acessar: frutas[0]."},{icone:"🧩",titulo:"funções",oque:"Blocos de código que executam uma tarefa e podem ser reutilizados.",exemplo:`def dobro(x):
    return x * 2
print(dobro(5))`,resultado:"10",como:"Use def nome(parametros): para criar. Use return para devolver o resultado calculado."},{icone:"📐",titulo:"len()",oque:"Conta quantos itens existem em uma lista ou quantos caracteres tem um texto.",exemplo:`print(len("abc"))
print(len([1, 2, 3]))`,resultado:`3
3`,como:'Coloque o texto ou a lista dentro dos parênteses: len("python") retorna 6.'},{icone:"🔢",titulo:"range()",oque:"Gera sequências de números para usar com loops.",exemplo:`for i in range(1, 6):
    print(i)`,resultado:`1
2
3
4
5`,como:"range(inicio, fim, passo). O fim não entra na conta. range(1, 6) gera 1 até 5."},{icone:"⚖️",titulo:"comparação",oque:"Operadores que comparam valores e devolvem verdadeiro (True) ou falso (False).",exemplo:`print(5 > 3)
print(5 == 5)
print(4 != 4)`,resultado:`True
True
False`,como:"São eles: > maior, < menor, >= maior ou igual, <= menor ou igual, == igual, != diferente. Use com if, elif e else."}];function Be(){return`
  <section class="page aprendizado">
    <h2 class="page-titulo">📚 Aprendizado</h2>
    <p class="page-sub">Consultas rápidas e simples sobre os conceitos usados nos desafios.</p>
    <div class="topicos">
      ${ze.map((e,a)=>`
      <details class="topico" ${a===0?"open":""}>
        <summary><span class="t-icone">${e.icone}</span>${g(e.titulo)}</summary>
        <div class="topico-conteudo">
          <h4>O que é?</h4>
          <p>${g(e.oque)}</p>
          <h4>Exemplo</h4>
          <pre class="codigo-exemplo"><code>${g(e.exemplo)}</code></pre>
          <h4>Como usar?</h4>
          <p>${g(e.como)}</p>
          ${e.resultado?`<div class="resultado-exemplo"><span class="tag">Resultado</span>${g(e.resultado)}</div>`:""}
        </div>
      </details>`).join("")}
    </div>
  </section>`}function ke(){const e=I(d.progresso,f.length);return`
  <section class="page config">
    <h2 class="page-titulo">⚙️ Configurações</h2>
    <div class="config-card">
      <h3>📱 Instalar aplicativo</h3>
      <p>Instale o Desafio Python Code na tela inicial do seu celular ou computador para usar em tela cheia.</p>
      <button class="btn btn-principal" data-acao="instalar-pwa" id="btn-instalar">📲 INSTALAR APLICATIVO</button>
    </div>
    <div class="config-card">
      <h3>🌓 Tema</h3>
      <p>Escolha o visual do aplicativo.</p>
      <div class="botao-grupo" id="grupo-tema">
        <button class="btn tema-btn ativo" data-acao="tema" data-tema="claro">☀️ Claro</button>
        <button class="btn tema-btn" data-acao="tema" data-tema="escuro">🌙 Escuro</button>
      </div>
    </div>
    <div class="config-card">
      <h3>♻️ Redefinir progresso</h3>
      <p>Apaga todas as conquistas, pontos e desafios resolvidos.</p>
      <button class="btn btn-perigo" data-acao="resetar-progresso">APAGAR MEU PROGRESSO</button>
    </div>
    <div class="config-card">
      <h3>ℹ️ Sobre</h3>
      <p>🐍 Desafio Python Code — professor virtual de Python.<br>
      ${f.length} desafios · execução segura em Pyodide (WebAssembly) · PWA.<br>
      Progresso atual: ${e.concluidos}/${f.length} desafios · ${e.pontuacao} pts.</p>
    </div>
  </section>`}function K(e,a){return e&&e.kind==="timeout"?{titulo:"Tempo esgotado",causa:"Seu código ficou demorando demais para terminar. Isso costuma acontecer quando existe um loop que nunca para.",como:"Revise o loop. Pergunte-se: em algum momento a condição fica falsa? No for, confira se o range() tem um fim definido. No while, verifique se algo dentro do loop muda o valor que a condição analisa."}:e?{titulo:"Falha na execução",causa:"Aconteceu um problema ao rodar seu código: "+(e.message||e),como:je(a).codigo}:null}function je(e){return{codigo:e.solucao,explicacao:e.explicacao,dicas:e.dicas}}function _e(e,a,o){const t=e.pontos,r=e.avaliacao.pontosBonus;return`
  <div class="painel-resultado ok animacao-sucesso">
    <div class="sucesso-icone">${e.acertoNaPrimeira?"🌟":"✅"}</div>
    <div class="sucesso-titulo">PARABÉNS! Desafio concluído!</div>
    <div class="sucesso-mensagem">Você resolveu o desafio corretamente. Diferentes soluções corretas são aceitas!</div>
    <div class="sucesso-detalhes">
      <div class="sd-item"><strong>🏆 +${t} pontos</strong>${e.acertoNaPrimeira?" <em>(de primeira!)</em>":""}</div>
      ${r?`<div class="sd-item"><strong>🎁 +${r} bônus</strong> <em>testes extras</em></div>`:""}
      <div class="sd-item"><span class="tag">Saída produzida</span><code>${g(e.saida)}</code></div>
      <div class="sd-item"><span class="tag">Progresso</span><strong>${o.concluidos}/${f.length} desafios (${o.percentual}%)</strong></div>
    </div>
    ${e.proximaDesafio?`<button class="btn btn-principal" data-acao="abrir-desafio" data-id="${e.proximaDesafio}">PRÓXIMO DESAFIO →</button>`:'<div class="banner-final pequeno">🏆 DESAFIO PYTHON CODE CONCLUÍDO!</div>'}
  </div>`}function He(e){return`
    <div class="dica-caixa">
      <strong>Dica:</strong> ${g(e.dica)}
      <button class="btn btn-solucao" data-acao="ver-solucao">📖 VER COMO FAZER</button>
    </div>`}function Ve(e){return`
  <div class="solucao-caixa">
    <h4>COMO RESOLVER</h4>
    <pre class="codigo-exemplo"><code>${g(e.solucao)}</code></pre>
    <p>${g(e.explicacao)}</p>
    <p class="aviso-solucao">Lembre-se: esta é apenas uma forma possível de resolver. Sua solução pode ser diferente e ainda assim correta!</p>
  </div>`}function Ge(e,a,o,t,r){const n=o.teste,s=(n.input||[]).join(" · "),i=Array.isArray(n.expected)?n.expected.join(" / "):n.expected,u=(o.dados.output||"").trim();let c="ERRO!",p="";if(a&&a.causa)c=a.titulo,p=a.causa;else if(o.dados.ok){c="ERRO!";const m=typeof i=="string"?i:String(i);p=`Seu programa produziu "${u||"(nada)"}", mas o resultado esperado era "${m}".`}else{const m=o.dados.errorType||"";m==="SyntaxError"?(c="ERRO DE SINTAXE",p=`Parece que existe um problema na estrutura do seu código. Verifique se os parênteses, os dois pontos e as aspas estão corretos. Aproximadamente na linha ${o.dados.linha||"?"}.`):m==="EOFError"?(c="Faltaram valores",p="O programa tentou ler mais valores do que foram fornecidos na entrada. Confira a ordem dos input() e quantos valores você usa."):m==="ZeroDivisionError"?(c="Divisão por zero",p="Seu código tentou dividir por zero, o que não é permitido. Confira os valores usados na divisão."):m==="NameError"?(c="Nome não definido",p="O programa usou um nome que ainda não foi criado. Confira se a variável ou função foi criada antes de ser usada, com o nome certo."):m==="TypeError"||m==="ValueError"?(c="Conversão de dados",p="Parece que você tentou fazer uma conta com texto. Transforme o valor recebido pelo input() em número usando int() ou float() antes de operar."):m==="Bloqueio"?(c="Operação não permitida",p=o.dados.error||"Essa operação não é permitida neste desafio."):(c="ERRO!",p=o.dados.error&&o.dados.error.split(`
`).pop()||"O programa falhou durante a execução.")}return`
  <div class="painel-resultado erro" id="bloco-erro">
    <div class="erro-titulo">${c}</div>
    <div class="erro-sub">${g(s?`Entrada usada: ${s}`:"Execução sem entrada")}</div>

    <h4>O que aconteceu?</h4>
    <p>${g(p)}</p>

    <div class="erro-comparacao">
      <div class="ec-col"><span class="tag">Saída produzida</span><code>${g(u||"(vazia)")}</code></div>
      <div class="ec-col"><span class="tag">Esperado</span><code>${g(String(i))}</code></div>
    </div>

    <div class="erro-acoes">
      <button class="btn btn-dica" data-acao="ver-dica">💡 DICA</button>
      <button class="btn btn-repetir" data-acao="executar">↻ TENTAR DE NOVO</button>
    </div>
    <div class="dica-conteudo" id="dica-conteudo" style="display:none"></div>
  </div>`}async function se(e){const a=document.querySelector(".desafio"),o=te(a)||"";if(d.executando)return;if(!o.trim()||o.trim()==="# Digite seu código aqui"){w("Escreva seu código antes de executar.","erro");return}d.executando=!0;const t=document.getElementById("btn-executar");t&&(t.disabled=!0,t.textContent="⏳ EXECUTANDO...");const r=document.getElementById("area-resultado");r&&(r.innerHTML='<div class="painel-executando"><span class="spinner"></span> Executando seu código...</div>');try{if(!await Te())throw new Error("python-nao-carregou");const s=e.testes||[],i=s.map(x=>x.input||[]),u=await Ae(o,i),c=Ce(e,u),p=d.progresso.tentativas[e.id]||0,m=fe(d.progresso,e.id),l=u[0]||{ok:!1,output:""};if(c.correto){const x=!!d.progresso.dicasUsadas[e.id],h=qe(p,x)+c.pontosBonus;await ve(d.progresso,e.id,h);const M=We();M&&w(`Conquista desbloqueada: ${M}`,"ok");const ce=I(d.progresso,f.length),de=e.id<f.length?e.id+1:null;r.innerHTML=_e({pontos:h,acertoNaPrimeira:p===0,avaliacao:c,saida:l.ok?(l.output||"").trim().slice(0,600):"",proximaDesafio:de},e,ce),Xe()}else{const x=K((c.erroDoPrimeiro,null),e),h=c.erroDoPrimeiro||{teste:s[0],dados:l};r.innerHTML=Ge(e,x,h,{avaliacao:c},I(d.progresso,f.length))}}catch(n){const s=K(n,e);r&&s?r.innerHTML=`
      <div class="painel-resultado erro">
        <div class="erro-titulo">${s.titulo}</div>
        <h4>O que aconteceu?</h4>
        <p>${s.causa}</p>
        <div class="dica-caixa">
          <button class="btn btn-solucao" data-acao="ver-solucao">📖 VER COMO FAZER</button>
        </div>
      </div>`:r&&(r.innerHTML=`<div class="painel-resultado erro"><div class="erro-titulo">ERRO!</div><p>${g(n.message||String(n))}</p></div>`)}finally{d.executando=!1,t&&(t.disabled=!1,t.textContent="▶ EXECUTAR CÓDIGO")}}function We(){let e=null;for(const a of Z)a.condicao(d.progresso)&&!d.progresso.conquistas.includes(a.id)&&(xe(d.progresso,a.id),e=a.titulo);return e}function Xe(){const e=document.querySelector(".selo-ok");e&&e.remove()}function B(){const e=location.hash||"#/";if(window.scrollTo({top:0}),e.startsWith("#/desafio/")){const a=parseInt(e.split("/")[2],10),o=f.find(t=>t.id===a);d.desafioAtual=o?a:1,O.innerHTML=Me(d.desafioAtual),Je(),L();return}if(e==="#/desafios"){O.innerHTML=Le();return}if(e==="#/progresso"){O.innerHTML=Ue();return}if(e==="#/conquistas"){O.innerHTML=Fe();return}if(e==="#/aprendizado"){O.innerHTML=Be();return}if(e==="#/config"){O.innerHTML=ke(),ie();return}if(e==="#/aleatorio"){ne();return}O.innerHTML=De()}function Je(){const e=document.querySelector(".desafio");e&&ae(e,ee(d.progresso,d.desafioAtual)||`# Digite seu código aqui
`)}function ne(){const e=f[Math.floor(Math.random()*f.length)];d.desafioAtual=e.id,location.hash=`#/desafio/${e.id}`}function L(){d.carregado||d.carregando||(d.carregando=oe().then(()=>{d.carregando=null,d.carregado=!0;const e=document.getElementById("python-loading");e&&e.remove()}).catch(()=>{d.carregando=null,d.carregado=!1,w("Falha ao carregar o Python. Verifique sua conexão e recarregue.","erro")}),requestAnimationFrame(()=>{const e=document.getElementById("python-loading-placeholder");e&&(e.style.display="",e.innerHTML=Ne())}))}function ie(){const e=localStorage.getItem("desafio-tema")||"claro";document.body.dataset.tema=e}document.addEventListener("click",async e=>{const a=e.target.closest("[data-acao]");if(!a)return;const o=a.dataset.acao;if(o==="navegar"){location.hash=a.dataset.rota;return}if(o==="abrir-desafio"){const t=parseInt(a.dataset.id,10);d.desafioAtual=t,location.hash=`#/desafio/${t}`,L();return}if(o==="abrir-aleatorio"){ne(),L();return}if(o==="executar"){const t=f.find(r=>r.id===d.desafioAtual);t&&(L(),await se(t));return}if(o==="limpar"){const t=document.querySelector(".desafio"),r=t&&t.querySelector("textarea.code-input");r&&(r.value="",r.focus(),j(()=>Promise.resolve().then(()=>X),void 0).then(n=>n.atualizarEditor(t)));return}if(o==="resetar"){const t=document.querySelector(".desafio"),r=t&&t.querySelector("textarea.code-input");r&&(r.value=`# Digite seu código aqui
`,j(()=>Promise.resolve().then(()=>X),void 0).then(n=>n.atualizarEditor(t)));return}if(o==="ver-dica"){const t=f.find(n=>n.id===d.desafioAtual),r=document.getElementById("dica-conteudo");if(r&&r.closest(".painel-resultado"),r&&t){r.style.display="",r.innerHTML=He({dica:t.dicas[0]}),H(d.progresso,t.id),d.dicaVista=!0;const n=a;n&&(n.style.display="none")}return}if(o==="ver-solucao"){const t=f.find(n=>n.id===d.desafioAtual),r=document.getElementById("dica-conteudo");r&&t&&(r.innerHTML=Ve(t),H(d.progresso,t.id));return}if(o==="tema"){const t=a.dataset.tema;document.body.dataset.tema=t,localStorage.setItem("desafio-tema",t),document.querySelectorAll(".tema-btn").forEach(r=>r.classList.toggle("ativo",r===a));return}if(o==="resetar-progresso"){confirm("Tem certeza que deseja apagar todo o seu progresso?")&&(d.progresso=he(),w("Progresso redefinido.","ok"),B());return}if(o==="instalar-pwa"){N?(N.prompt(),await N.userChoice,N=null):w('Use "Adicionar à tela inicial" no menu do navegador para instalar.',"info");return}});let N=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),N=e;const a=document.getElementById("btn-instalar");a&&a.classList.add("disponivel")});document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter"&&document.querySelector(".desafio")){e.preventDefault();const o=f.find(t=>t.id===d.desafioAtual);o&&se(o)}});window.addEventListener("hashchange",B);function Ke(){ie(),setTimeout(()=>L(),600),B()}function Ye(){Ke()}const Y={},Ze=typeof import.meta<"u"&&Y&&!0||!Y;"serviceWorker"in navigator&&Ze&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});Ye();
