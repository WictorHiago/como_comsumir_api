#!/usr/bin/env node

/**
 * Script de Teste da API
 * Testa todos os endpoints da API hospedada no Vercel
 * 
 * Uso: node test-api.js
 *      node test-api.js --local (para testar localhost)
 */

const BASE_URL = process.argv.includes('--local') 
    ? 'http://localhost:3000' 
    : 'https://como-comsumir-api.vercel.app';

// Cores para o terminal
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

// Função para fazer requisições HTTP
async function makeRequest(url, method = 'GET') {
    try {
        const response = await fetch(url, { method });
        const data = await response.json();
        return {
            success: response.ok,
            status: response.status,
            data,
            url
        };
    } catch (error) {
        return {
            success: false,
            status: 0,
            error: error.message,
            url
        };
    }
}

// Função para exibir resultados
function displayResult(testName, result) {
    const statusColor = result.success ? colors.green : colors.red;
    const statusText = result.success ? '✓ PASS' : '✗ FAIL';
    
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}${testName}${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.blue}URL:${colors.reset} ${result.url}`);
    console.log(`${colors.blue}Status:${colors.reset} ${statusColor}${result.status} ${statusText}${colors.reset}`);
    
    if (result.success) {
        console.log(`${colors.green}Response:${colors.reset}`);
        console.log(JSON.stringify(result.data, null, 2));
    } else {
        console.log(`${colors.red}Error:${colors.reset} ${result.error || result.data?.message || 'Unknown error'}`);
    }
}

// Função principal de testes
async function runTests() {
    console.log(`${colors.bold}${colors.cyan}`);
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║           🧪 TESTE DE ENDPOINTS DA API                    ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log(`${colors.reset}`);
    console.log(`${colors.yellow}Base URL: ${BASE_URL}${colors.reset}\n`);

    const results = [];
    let passed = 0;
    let failed = 0;

    // Teste 1: Rota raiz
    console.log(`${colors.yellow}Iniciando testes...${colors.reset}\n`);
    
    const test1 = await makeRequest(`${BASE_URL}/`);
    displayResult('1. Rota Raiz (GET /)', test1);
    results.push(test1);
    if (test1.success) passed++; else failed++;

    // Teste 2: Listar todos os produtos
    const test2 = await makeRequest(`${BASE_URL}/api/v1/product`);
    displayResult('2. Listar Todos os Produtos (GET /api/v1/product)', test2);
    results.push(test2);
    if (test2.success) passed++; else failed++;

    // Teste 3: Listar todas as categorias
    const test3 = await makeRequest(`${BASE_URL}/api/v1/category`);
    displayResult('3. Listar Todas as Categorias (GET /api/v1/category)', test3);
    results.push(test3);
    if (test3.success) passed++; else failed++;

    // Teste 4: Obter banco de dados completo
    const test4 = await makeRequest(`${BASE_URL}/api/v1/database`);
    displayResult('4. Obter Banco de Dados Completo (GET /api/v1/database)', test4);
    results.push(test4);
    if (test4.success) passed++; else failed++;

    // Teste 5: Buscar produto por ID (usando ID do primeiro produto se disponível)
    if (test2.success && test2.data?.data && test2.data.data.length > 0) {
        const productId = test2.data.data[0].id;
        const test5 = await makeRequest(`${BASE_URL}/api/v1/product/${productId}`);
        displayResult(`5. Buscar Produto por ID (GET /api/v1/product/${productId})`, test5);
        results.push(test5);
        if (test5.success) passed++; else failed++;
    } else {
        console.log(`\n${colors.yellow}⚠ Teste 5 pulado: Não foi possível obter ID de produto${colors.reset}`);
    }

    // Teste 6: Buscar categoria por ID (usando ID da primeira categoria se disponível)
    if (test3.success && test3.data?.data && test3.data.data.length > 0) {
        const categoryId = test3.data.data[0].id;
        const test6 = await makeRequest(`${BASE_URL}/api/v1/category/${categoryId}`);
        displayResult(`6. Buscar Categoria por ID (GET /api/v1/category/${categoryId})`, test6);
        results.push(test6);
        if (test6.success) passed++; else failed++;

        // Teste 7: Buscar produtos por categoria
        const test7 = await makeRequest(`${BASE_URL}/api/v1/product/by_category/${categoryId}`);
        displayResult(`7. Buscar Produtos por Categoria (GET /api/v1/product/by_category/${categoryId})`, test7);
        results.push(test7);
        if (test7.success) passed++; else failed++;
    } else {
        console.log(`\n${colors.yellow}⚠ Testes 6 e 7 pulados: Não foi possível obter ID de categoria${colors.reset}`);
    }

    // Teste 8: Produto não encontrado (404) - Esperamos 404
    const test8 = await makeRequest(`${BASE_URL}/api/v1/product/00000000-0000-0000-0000-000000000000`);
    const test8Success = test8.status === 404;
    if (test8Success) {
        test8.success = true; // Marca como sucesso se retornar 404
    }
    displayResult('8. Produto Não Encontrado - 404 (GET /api/v1/product/invalid-id)', test8);
    results.push(test8);
    if (test8Success) passed++; else failed++;

    // Teste 9: Categoria não encontrada (404) - Esperamos 404
    const test9 = await makeRequest(`${BASE_URL}/api/v1/category/00000000-0000-0000-0000-000000000000`);
    const test9Success = test9.status === 404;
    if (test9Success) {
        test9.success = true; // Marca como sucesso se retornar 404
    }
    displayResult('9. Categoria Não Encontrada - 404 (GET /api/v1/category/invalid-id)', test9);
    results.push(test9);
    if (test9Success) passed++; else failed++;

    // Teste 10: Rota não encontrada (404) - Esperamos 404 ou qualquer erro (Vercel pode retornar HTML)
    const test10 = await makeRequest(`${BASE_URL}/api/v1/rota-inexistente`);
    // Vercel pode retornar HTML para rotas não encontradas, então aceitamos qualquer resposta de erro
    const test10Success = test10.status === 404 || (!test10.success && test10.status !== 200);
    if (test10Success) {
        test10.success = true; // Marca como sucesso se retornar erro (404 ou outro)
    }
    displayResult('10. Rota Não Encontrada - 404 (GET /api/v1/rota-inexistente)', test10);
    results.push(test10);
    if (test10Success) passed++; else failed++;

    // Resumo final
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}                    📊 RESUMO DOS TESTES                    ${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}✓ Testes Passados: ${passed}${colors.reset}`);
    console.log(`${colors.red}✗ Testes Falhados: ${failed}${colors.reset}`);
    console.log(`${colors.blue}Total de Testes: ${results.length}${colors.reset}`);
    
    const successRate = ((passed / results.length) * 100).toFixed(1);
    const rateColor = successRate >= 80 ? colors.green : successRate >= 50 ? colors.yellow : colors.red;
    console.log(`${colors.blue}Taxa de Sucesso: ${rateColor}${successRate}%${colors.reset}`);
    
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    // Retorna código de saída baseado no resultado
    process.exit(failed > 0 ? 1 : 0);
}

// Executa os testes
runTests().catch(error => {
    console.error(`${colors.red}Erro ao executar testes:${colors.reset}`, error);
    process.exit(1);
});

