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
    `
}

export { Navigation as Navigation }