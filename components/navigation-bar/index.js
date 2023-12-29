const Navigation = {
    global: `
        <nav class="w-full px-[5vh]">
            <ul class="w-full my-3 text-custom-black text-3xl font-medium grid grid-flow-col gap-72 border-b-2">
                <li class="mb-2">
                    <a href="upload-csv" class="nav-item w-fit" id="upload-csv">
                        Upload CSV
                    </a>
                </li>
                <li class="mb-2">
                    <a href="graph-bar" class="nav-item w-fit" id="graph-bar">
                        Grafik Bar
                    </a>
                </li>
                <li class="mb-2">
                    <a href="scatter-plot" class="nav-item w-fit" id="scatter-plot">
                        Scatter Plot
                    </a>
                </li>
                <li class="mb-2">
                    <a href="summary" class="nav-item w-fit" id="summary">
                        Summary
                    </a>
                </li>
            </ul>
        </nav>
    `,
    hint: (Origin) => {
        return `
            <nav class="w-full px-[5vh]">
                <ul class="w-full my-3 inline-flex items-center border-b-2">
                    <a href="${Origin}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-12 aspect-square">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" class="absolute top-0 left-0"/>
                        </svg>
                    </a>
                    <div class="flex-1 pr-10 flex justify-center">
                        <h1 class="nav-item text-3xl font-medium border-b-8 pb-1" id="hint">Deskripsi Atribut</h1>
                    </div>
                </ul>
            </nav>
        `
    }
}

export { Navigation as Navigation }