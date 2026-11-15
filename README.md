# ✦ Barbearia das Arábias

Site institucional da **Barbearia das Arábias**, em Santana, Camaragibe - PE.
Visual preto e dourado de inspiração árabe, 100% estático (HTML, CSS e JavaScript puro), sem frameworks e sem etapa de build.

> *Cortes de Rei e Barba de Respeito.*

---

## Funcionalidades

- **Status em tempo real:** badge "Aberto agora • Fecha às 19h" ou "Fechado • Abre amanhã às 09h", sempre no horário de Recife, independente do fuso de quem visita. Atualiza sozinho a cada minuto.
- **Horários com destaque:** o dia de hoje fica marcado na lista de horários.
- **Visual árabe:** paleta preto e dourado, padrão arabesco no fundo, ornamentos e serviços em medalhões redondos.
- **Responsivo:** layout pensado primeiro para celular, com menu hambúrguer animado.
- **Animações suaves:** entrada do hero, elementos que aparecem ao rolar, header que ganha fundo ao rolar e link ativo no menu. Respeita a preferência "reduzir movimento" do sistema.
- **Botões de ação:** agendar pelo Instagram, chamar no Direct e abrir o endereço no Google Maps.
- **SEO e compartilhamento:** meta description, preview para WhatsApp/Facebook (Open Graph) e dados estruturados (`BarberShop`) com endereço e horários para o Google.
- **Acessibilidade:** navegação por teclado, foco visível, link "pular para o conteúdo" e rótulos ARIA no menu.

## Estrutura

```
.
├── index.html   # Conteúdo e estrutura da página
├── style.css    # Todo o visual (cores, fontes, layout, animações)
├── script.js    # Menu, animações, status aberto/fechado
├── img/         # (opcional) artes dos medalhões
└── README.md
```

## Como rodar localmente

Não precisa instalar nada. Basta abrir o `index.html` no navegador (duplo clique).

Se preferir um servidor local, com o VS Code você pode usar a extensão **Live Server**, ou, com Python instalado:

```bash
python -m http.server 8000
```

E abrir `http://localhost:8000`.

## Como personalizar

### Horários de funcionamento

Os horários aparecem em **três lugares**. Ao mudar, atualize todos:

1. `script.js`, objeto `HORARIOS` (usado pelo badge aberto/fechado). Os valores são em minutos desde 00:00:

   ```js
   const HORARIOS = {
       0: [8 * 60, 12 * 60],   // Domingo
       1: null,                // Segunda: fechado
       2: [9 * 60, 19 * 60],   // Terça
       // ...
   };
   ```

2. `index.html`, lista `<ul class="hours">` na seção de contato.
3. `index.html`, bloco `application/ld+json` no `<head>` (dados para o Google).

### Cores

Todas as cores ficam no início do `style.css`, em `:root`:

```css
:root {
    --bg: #090b0f;        /* fundo */
    --gold: #d4af5a;      /* dourado principal */
    --gold-light: #f0d58c;
    --gold-dark: #8f6e2a;
    /* ... */
}
```

### Medalhões dos serviços (artes do Instagram)

Cada serviço usa um ícone SVG simples. Para usar as artes reais da barbearia, salve as imagens em `img/` e troque o `<svg>` por uma imagem dentro do medalhão:

```html
<div class="medal"><div class="medal-inner">
    <img src="img/cortes.png" alt="">
</div></div>
```

O CSS já ajusta a imagem para preencher o círculo.

### Foto do hero

A imagem de fundo do topo é definida em `.hero` no `style.css`. Para usar uma foto da própria barbearia, troque a URL do `url('...')` por `img/fachada.jpg` (ou o nome do seu arquivo).

### Textos, serviços e contato

Tudo está em português direto no `index.html`: basta editar os textos. Para adicionar um serviço, copie um bloco `<article class="card reveal">...</article>`.

## Publicando o site

Por ser estático, qualquer hospedagem de arquivos serve. Opções gratuitas:

| Opção | Como publicar |
|---|---|
| **Cloudflare Pages** | Painel do Cloudflare → Workers & Pages → Pages → enviar a pasta do projeto |
| **Netlify** | Arrastar a pasta do projeto em [app.netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Subir o projeto num repositório e ativar Pages em *Settings → Pages* |

Confira os termos de uso comercial de cada plano antes de publicar um site de negócio.

Depois de publicar, vale conectar um **domínio próprio** (por exemplo, `.com.br` pelo [registro.br](https://registro.br)) e colocar o link no perfil do Instagram.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox, animações)
- JavaScript (ES6+, sem dependências)
- Fontes: [Cinzel](https://fonts.google.com/specimen/Cinzel) e [Inter](https://fonts.google.com/specimen/Inter), via Google Fonts

## Contato da barbearia

- 📍 Rua Antônio Pereira de Lucena, nº 100 - Santana, Camaragibe - PE
- 📸 Instagram: [@barbeariadasarabias_](https://instagram.com/barbeariadasarabias_)

---

&copy; 2026 Barbearia das Arábias. Todos os direitos reservados.
