# 🌊 AQUA THERM — Piscina Térmica Inteligente do CEP

Site desenvolvido para o **Projeto Integrador** do Centro de Educação Profissional (CEP), sobre o tema:

> *"Aquecimento de piscinas térmicas de forma eficiente e sustentável, integrando óptica, robótica e acessibilidade digital."*

Uma página única (one-page) com visual futurista em azul escuro, gráficos interativos, imagens SVG ilustrativas e efeitos visuais 3D.

**by Matheus V. • 2026**

---

## 📁 Estrutura do projeto
HTML, CSS e JavaScript ficam em arquivos separados, organizados em pastas dedicadas.

---

## 🚀 Como rodar

1. Abra `index.html` direto no navegador — não precisa de servidor.
2. Internet é necessária para carregar as fontes (Google Fonts) e a biblioteca de gráficos (Chart.js via CDN).

### Publicar no GitHub Pages

Suba os arquivos para o repositório e ative em **Settings → Pages → branch `main` + `/ (root)`**. O site fica no ar em `https://<usuario>.github.io/<repositorio>/`.

---

## 🎨 Design

| Item | Escolha |
| --- | --- |
| Tema | Escuro, futurista e minimalista |
| Paleta | Azul profundo `#050d1a`, ciano `#38bdf8`, azul elétrico `#3b82f6`, âmbar solar `#fbbf24` |
| Tipografia | Unbounded (títulos) + Sora (texto) — Google Fonts |
| Atmosfera | Grid 3D em perspectiva no hero, glow radial, partículas animadas (bolhas em canvas) |

---

## ✨ Efeitos e interações

- Partículas flutuantes em `<canvas>` cobrindo a página toda
- Cards com tilt 3D que seguem o mouse (perspective + rotateX/rotateY)
- Contadores animados nas estatísticas do hero (easing cubic)
- Reveal progressivo das seções ao rolar (IntersectionObserver)
- Barra de progresso de leitura no topo
- Nav com scroll-spy (destaca a seção ativa) e menu mobile animado
- Zoom suave nas imagens SVG, timeline com hover e scrollbar personalizada
- Acessibilidade: respeita `prefers-reduced-motion`

---

## 📊 Gráficos (Chart.js)

Os três gráficos são renderizados só quando entram na tela (lazy + animação):

1. **Linha** — Temperatura da água ao longo do dia (com e sem aquecimento solar)
2. **Rosca** — Matriz energética do sistema (solar térmica, elétrica de apoio, perdas)
3. **Barras horizontais** — Economia estimada por tecnologia aplicada

### Dados utilizados

| Dado | Valor | Referência |
| --- | --- | --- |
| Eficiência do coletor solar térmico | ~70% | BRASIL/MME, 2023 |
| Temperatura ideal da piscina | 32 °C | Projeto Integrador CEP |
| Contribuição solar no aquecimento | 70% | Simulação do projeto |
| Economia com cobertura térmica | até 40% | ELETROBRAS, 2022 |
| Economia com automação (sensores) | até 30% | Estimativa do projeto |
| Economia com isolamento | até 15% | Estimativa do projeto |

---

## 🧩 Seções do site

1. **Hero** — título, tema e estatísticas animadas
2. **Desafio** — introdução ao problema do aquecimento + diagrama SVG do sistema
3. **Óptica** — absorção, reflexão, refração, Disco de Newton, Câmara Escura e conversão térmica + diagrama SVG de refração
4. **Robótica** — timeline de automação (sensores → decisão → atuadores → dashboard) + fluxograma SVG de controle
5. **Dados** — os 3 gráficos interativos com dados estimados
6. **Acessibilidade** — práticas WCAG 2.1 implementadas no site
7. **Futuro** — conclusão do projeto
8. **Footer** — créditos e referências

---

## ♿ Acessibilidade Digital

O site foi desenvolvido seguindo as diretrizes **WCAG 2.1**:

- ✅ Contraste mínimo AA/AAA entre texto e fundo (paleta azul escuro + texto claro)
- ✅ Textos alternativos em todas as imagens e SVGs (`<title>`, `aria-label`, `role="img"`)
- ✅ Navegação completa por teclado (Tab, Enter, foco visível)
- ✅ Fontes legíveis (Sora, mínimo 16px no corpo, espaçamento generoso)
- ✅ Estrutura HTML semântica (landmarks, headings hierárquicos, aria-labels)
- ✅ Respeito à preferência `prefers-reduced-motion`
- ✅ Menu mobile acessível com `aria-expanded` e `aria-label` dinâmicos

---

## 📚 Referências

- BRASIL. Ministério de Minas e Energia. *Aquecimento Solar de Água: guia de implantação*. Brasília: MME, 2023.
- ELETROBRAS. *Eficiência energética em sistemas de aquecimento de água*. Rio de Janeiro: Procel, 2022.
- EMBRAPA. *Energia solar em aplicações rurais e urbanas*. Brasília, 2024.
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.1*. Disponível em: https://www.w3.org/TR/WCAG21/
- ARDUINO. *Documentação oficial — sensores e atuadores*. Disponível em: https://www.arduino.cc
- ESPRESSIF. *ESP32 Datasheet*. Disponível em: https://www.espressif.com

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 puro (variáveis, grid, animações, backdrop-filter, media queries)
- JavaScript vanilla (sem frameworks)
- [Chart.js 4](https://www.chartjs.org/) via CDN
- Google Fonts (Unbounded + Sora)
- SVG inline para ilustrações técnicas (sem dependência de imagens externas)
