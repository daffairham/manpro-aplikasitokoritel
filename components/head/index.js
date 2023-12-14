const Head = (Css, Script, Title) => {
    return `
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="${Css}">
            <script src="${Script}"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>    
            <title>${Title}</title>
        </head>
    `
}

export { Head as Head}
