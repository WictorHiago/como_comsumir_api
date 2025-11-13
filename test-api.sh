#!/bin/bash

# Script de Teste da API (Bash)
# Testa todos os endpoints da API hospedada no Vercel
#
# Uso: bash test-api.sh
#      bash test-api.sh --local (para testar localhost)

# Cores para o terminal
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Define a URL base
if [[ "$1" == "--local" ]]; then
    BASE_URL="http://localhost:3000"
else
    BASE_URL="https://como-comsumir-api.vercel.app"
fi

# Contadores
PASSED=0
FAILED=0
TOTAL=0

# Função para fazer requisição e exibir resultado
test_endpoint() {
    local test_name="$1"
    local url="$2"
    local expected_status="${3:-200}"
    
    TOTAL=$((TOTAL + 1))
    
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${test_name}${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}URL:${NC} ${url}"
    
    # Faz a requisição
    response=$(curl -s -w "\n%{http_code}" "$url")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Verifica o status code
    if [ "$http_code" -eq "$expected_status" ]; then
        echo -e "${BLUE}Status:${NC} ${GREEN}${http_code} ✓ PASS${NC}"
        echo -e "${GREEN}Response:${NC}"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
        PASSED=$((PASSED + 1))
    else
        echo -e "${BLUE}Status:${NC} ${RED}${http_code} ✗ FAIL (esperado: ${expected_status})${NC}"
        echo -e "${RED}Response:${NC}"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
        FAILED=$((FAILED + 1))
    fi
}

# Cabeçalho
echo -e "${BOLD}${CYAN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║           🧪 TESTE DE ENDPOINTS DA API                    ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo -e "${YELLOW}Base URL: ${BASE_URL}${NC}"
echo ""

# Verifica se curl está instalado
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Erro: curl não está instalado.${NC}"
    echo "Instale o curl para usar este script."
    exit 1
fi

# Verifica se jq está instalado (opcional, para formatação JSON)
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠ Aviso: jq não está instalado. As respostas JSON não serão formatadas.${NC}"
    echo "Instale o jq para melhor visualização: sudo apt-get install jq (Linux) ou brew install jq (Mac)"
    echo ""
fi

# Testes
echo -e "${YELLOW}Iniciando testes...${NC}"

# Teste 1: Rota raiz
test_endpoint "1. Rota Raiz (GET /)" "${BASE_URL}/" 200

# Teste 2: Listar todos os produtos
test_endpoint "2. Listar Todos os Produtos (GET /api/v1/product)" "${BASE_URL}/api/v1/product" 200

# Teste 3: Listar todas as categorias
test_endpoint "3. Listar Todas as Categorias (GET /api/v1/category)" "${BASE_URL}/api/v1/category" 200

# Teste 4: Obter banco de dados completo
test_endpoint "4. Obter Banco de Dados Completo (GET /api/v1/database)" "${BASE_URL}/api/v1/database" 200

# Teste 5: Buscar produto por ID (ID de exemplo - será atualizado se necessário)
PRODUCT_ID="f4b9e8b3-1c4f-4f7a-915d-6a3a1bbad876"
test_endpoint "5. Buscar Produto por ID (GET /api/v1/product/${PRODUCT_ID})" "${BASE_URL}/api/v1/product/${PRODUCT_ID}" 200

# Teste 6: Buscar categoria por ID (ID de exemplo)
CATEGORY_ID="b6d9a2e8-4b25-4b9c-a0b2-67abfeaf452e"
test_endpoint "6. Buscar Categoria por ID (GET /api/v1/category/${CATEGORY_ID})" "${BASE_URL}/api/v1/category/${CATEGORY_ID}" 200

# Teste 7: Buscar produtos por categoria
test_endpoint "7. Buscar Produtos por Categoria (GET /api/v1/product/by_category/${CATEGORY_ID})" "${BASE_URL}/api/v1/product/by_category/${CATEGORY_ID}" 200

# Teste 8: Produto não encontrado (404)
test_endpoint "8. Produto Não Encontrado - 404 (GET /api/v1/product/invalid-id)" "${BASE_URL}/api/v1/product/00000000-0000-0000-0000-000000000000" 404

# Teste 9: Categoria não encontrada (404)
test_endpoint "9. Categoria Não Encontrada - 404 (GET /api/v1/category/invalid-id)" "${BASE_URL}/api/v1/category/00000000-0000-0000-0000-000000000000" 404

# Teste 10: Rota não encontrada (404)
test_endpoint "10. Rota Não Encontrada - 404 (GET /api/v1/rota-inexistente)" "${BASE_URL}/api/v1/rota-inexistente" 404

# Resumo final
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}                    📊 RESUMO DOS TESTES                    ${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Testes Passados: ${PASSED}${NC}"
echo -e "${RED}✗ Testes Falhados: ${FAILED}${NC}"
echo -e "${BLUE}Total de Testes: ${TOTAL}${NC}"

if [ $TOTAL -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=1; ($PASSED * 100) / $TOTAL" | bc)
    if (( $(echo "$SUCCESS_RATE >= 80" | bc -l) )); then
        RATE_COLOR=$GREEN
    elif (( $(echo "$SUCCESS_RATE >= 50" | bc -l) )); then
        RATE_COLOR=$YELLOW
    else
        RATE_COLOR=$RED
    fi
    echo -e "${BLUE}Taxa de Sucesso: ${RATE_COLOR}${SUCCESS_RATE}%${NC}"
fi

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Retorna código de saída baseado no resultado
if [ $FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi

