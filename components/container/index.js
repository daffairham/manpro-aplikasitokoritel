const Container = {
    upload: `
        <div class="bg-custom-black rounded-2xl w-full max-h-screen min-h-[60vh]">
        <form action="/upload" method="post" encType="multipart/form-data" class="h-full flex flex-col items-center justify-center">
                        <div class="text-[#fff] text-lg py-8 w-auto">
                    <input type="file" name="uploadfile" class="text-right">
                </div>
                <button type="submit" class="bg-custom-orchid border-2 border-custom-orchid hover:bg-custom-black  hover:border-custom-orchid hover:text-custom-orchid transition duration-0.75 px-4 py-2 font-medium text-lg text-custom-black rounded-lg">
                    Upload
                </button>
            </form>
        </div>
    `,
    graph: `
  <div class="bg-custom-black rounded-2xl w-full max-h-screen min-h-[60vh] inline-flex justify-between overflow-hidden">
    <form id="graphForm" action="/graph-bar" method="POST" class="mx-auto mt-12 h-80 w-auto flex flex-col items-center justify-between">
        <div class="grid grid-flow-row gap-3 w-56">
            <label for="atribut-1" class="text-[#fff] text-xl">Atribut 1</label>
            <select name="atribut-1" id="atribut-1" class="px-10 py-2 rounded-md text-xl">
                <option value="MntWines">Jumlah Wine</option>
                <option value="MntFruits">Jumlah Buah-buahan</option>
                <option value="MntMeatProducts">Jumlah Daging</option>
                <option value="MntFishProducts">Jumlah Ikan</option>
                <option value="MntSweetProducts">Jumlah Produk Manis</option>
                <option value="MntGoldProds">Jumlah Produk Emas</option>
            </select>
        </div>
        <button id="buttonId" class="w-full bg-custom-orchid border-2 border-custom-orchid hover:bg-custom-black hover:border-custom-orchid hover:text-custom-orchid transition duration-0.75 px-4 py-2 font-medium text-lg text-custom-black rounded-lg">
            Button
        </button>
    </form>
    <div class="h-full w-2/3 max-w-[130vh] px-6 py-8">
        <div class="h-[60vh] w-full aspect-auto bg-[#fff] overflow-hidden rounded-md inline-flex items-center justify-center">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</div>
    `,
    scatter: `
        <div class="bg-custom-black rounded-2xl w-full max-h-screen min-h-[60vh] inline-flex justify-between overflow-hidden">
                <form action="/scatter-plot" method="POST" class="mx-auto mt-12 h-80 w-auto flex flex-col items-center justify-between">
                    <div class="grid grid-flow-row gap-3 w-56">
                    <label for="atribut-1" class="text-[#fff] text-xl">Atribut 1</label>
                    <select name="atribut-1" id="atribut-1" class="px-10 py-2 rounded-md text-xl">
                            <option value="NumWebPurchases">Pembelian Web</option>
                            <option value="NumCatalogPurchases">Pembelian Katalog</option>
                            <option value="NumStorePurchases">Pembelian Toko</option>
                        </select>

                        <label for="atribut-2" class="text-[#fff] text-xl">Atribut 2</label>
                        <select name="atribut-2" id="atribut-2" class="px-10 py-2 rounded-md text-xl">
                            <option value="MntWines">Jumlah Wine</option>
                            <option value="MntFruits">Jumlah Buah-buahan</option>
                            <option value="MntMeatProducts">Jumlah Daging</option>
                            <option value="MntFishProducts">Jumlah Ikan</option>
                            <option value="MntSweetProducts">Jumlah Produk Manis</option>
                            <option value="MntGoldProds">Jumlah Produk Emas</option>
                        </select>
                    </div>
                    <button class="w-full bg-custom-orchid border-2 border-custom-orchid hover:bg-custom-black  hover:border-custom-orchid hover:text-custom-orchid transition duration-0.75 px-4 py-2 font-medium text-lg text-custom-black rounded-lg" id="buttonId">
                        Button
                    </button>
                </form>
                <div class="h-full w-2/3  max-w-[130vh] px-6 py-8">
                    <div class="h-[60vh] w-full aspect-auto bg-[#fff] overflow-hidden rounded-md inline-flex items-center justify-center">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
    `,
};

export { Container as Container };
