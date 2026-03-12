// Chave da API usada para autenticar requisições na API de clima
const apiKey = "9e37df206652221166b799d406f275cb";

// Seleção dos elementos da interface (DOM)
const button = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

// Evento de clique no botão para iniciar a busca do clima
button.addEventListener("click", buscarClima);

// Permite buscar o clima pressionando a tecla ENTER
input.addEventListener("keypress", function(e){
if(e.key === "Enter"){
buscarClima();
}
});

// Função principal responsável por buscar os dados de clima na API
function buscarClima(){

const city = input.value.trim();

// Validação simples caso o usuário não digite nenhuma cidade
if(city === ""){
result.innerHTML = "Digite uma cidade.";
return;
}

// Mensagem de carregamento enquanto a API responde
result.innerHTML = "<p class='loader'>Carregando clima...</p>";

// URL da requisição para a API de clima
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

// Requisição HTTP utilizando Fetch API
fetch(url)

.then(response => {

// Verifica se a resposta da API foi bem sucedida
if(!response.ok){
throw new Error("Cidade não encontrada");
}

return response.json();
})

// Manipulação dos dados retornados pela API (JSON)
.then(data => {

const temperatura = data.main.temp;
const descricao = data.weather[0].description;
const cidade = data.name;
const pais = data.sys.country;

// Seleciona um ícone visual baseado na condição do clima
const icon = getWeatherIcon(descricao);

// Atualização dinâmica da interface com os dados recebidos
result.innerHTML = `
<div class="icon">${icon}</div>
<h2>${cidade}, ${pais}</h2>
<p>🌡 Temperatura: ${temperatura}°C</p>
<p>Clima: ${descricao}</p>
`;

// limpa o campo de busca após mostrar o resultado
input.value = "";

})

.catch(error => {

// Tratamento de erro caso a cidade não exista ou a API falhe
result.innerHTML = "Cidade não encontrada.";

});
}

// Função que define qual ícone mostrar dependendo da descrição do clima
function getWeatherIcon(clima){

if(clima.includes("nuvem")) return "☁"
if(clima.includes("chuva")) return "🌧"
if(clima.includes("céu limpo")) return "☀"
if(clima.includes("tempestade")) return "⛈"
if(clima.includes("neve")) return "❄"

return "🌤"
}