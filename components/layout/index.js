import { Container } from "../container/index.js"

const Layout = {
    global: (Path) => {
        return `
            <section class="m-[5vh] w-full max-w-[200vh] inline-flex justify-between">
                <a href="${Path}" class="mr-[5vh]"> 
                    <img src="../assets/${Path}.svg" alt="Petunjuk" class="aspect-auto max-h-screen min-h-[60vh]">
                </a>
                ${Container.upload}
            </section>
        `
    },
    graphBar: `
            <section class="m-[5vh] w-full max-w-[200vh] inline-flex justify-between">
                <a href="#" class="mr-[5vh]"> 
                    <img src="../assets/grafik.svg" alt="Petunjuk" class="aspect-auto max-h-screen min-h-[60vh]">
                </a>
                ${Container.graphBar}
            </section>
    `

}

export { Layout as Layout}