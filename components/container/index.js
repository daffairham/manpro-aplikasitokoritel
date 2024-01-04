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
                            <option value="Year_Birth">Tahun Lahir</option>
                            <option value="Income">Pendapatan</option>
                            <option value="Kidhome">Anak di Rumah</option>
                            <option value="Teenhome">Remaja di Rumah</option>
                            <option value="Recency">Hari Pembelian Terakhir</option>                           

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
    summary: `
        <div class="bg-custom-black rounded-2xl w-full max-h-screen min-h-[60vh] inline-flex justify-between">
            <form action="/summary" method="post" class="mx-auto mt-12 h-80 w-auto flex flex-col items-center justify-between">
                <div class="grid grid-flow-row gap-3 w-56">
                    <label for="peopleColumn" class="text-[#fff] text-xl">Select People Column:</label>
                    <select name="peopleColumn" id="peopleColumn" class="px-10 py-2 rounded-md text-xl">
                        
                            <option value="Year_Birth">Tahun Lahir</option>
                            <option value="Education">Pendidikan</option>
                            <option value="Marital_Status">Status Perkawinan</option>
                            <option value="Income">Pendapatan</option>
                            <option value="Kidhome">Anak di Rumah</option>
                            <option value="Teenhome">Remaja di Rumah</option>
                            <option value="Dt_Customer">Tanggal Bergabung</option>
                            <option value="Recency">Pembelian Terakhir</option>
                            <option value="Complain">Keluhan</option>
                            
                    </select>

                    <label for="productsColumn" class="text-[#fff] text-xl">Select Products Column:</label>
                    <select name="productsColumn" id="productsColumn" class="px-10 py-2 rounded-md text-xl">
                        
                            <option value="MntWines">Jumlah Wine</option>
                            <option value="MntFruits">Jumlah Buah-buahan</option>
                            <option value="MntMeatProducts">Jumlah Daging</option>
                            <option value="MntFishProducts">Jumlah Ikan</option>
                            <option value="MntSweetProducts">Jumlah Produk Manis</option>
                            <option value="MntGoldProds">Jumlah Produk Emas</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-custom-orchid border-2 border-custom-orchid hover:bg-custom-black hover:border-custom-orchid hover:text-custom-orchid transition duration-0.75 px-4 py-2 font-medium text-lg text-custom-black rounded-lg">
                    Submit
                </button>
            </form>
            <div class="h-full w-2/3  max-w-[130vh] px-6 py-8">
            <table style="width: 100%; border-collapse: collapse; background-color: white; border: 5px solid #ccc;" id="myTable">
            <thead>
              <tr>
                <th style="padding: 12px; border-bottom: 3px solid #000;" id="atribut1"></th>
                <th style="padding: 12px; border-bottom: 3px solid #000;" id="atribut2"></th>
              </tr>
            </thead>
            <tbody">
              <tr>
                <td style="padding: 12px; border-right: 3px solid #000;" id="data1"></td>
                <td style="padding: 12px; border-bottom: 3px solid #000 border-right: 3px solid #000;" id="data2"></td>
              </tr>
              <tr>
              </tr>
            </tbody>
          </table>
                </div>
        </div>
    `,
};
export { Container as Container }