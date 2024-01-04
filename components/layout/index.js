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
    graph: (Path) => {
        return `
            <section class="m-[5vh] w-full max-w-[200vh] inline-flex justify-between">
                <a href="hint?origin=${Path}" class="mr-[5vh]"> 
                    <img src="../assets/grafik.svg" alt="Petunjuk" class="aspect-auto max-h-screen min-h-[60vh]">
                </a>
                ${Container.graph}
            </section>
        `
    } ,
    scatter: (Path) => {
        return `
            <section class="m-[5vh] w-full max-w-[200vh] inline-flex justify-between">
                <a href="hint?origin=${Path}" class="mr-[5vh]"> 
                    <img src="../assets/grafik.svg" alt="Petunjuk" class="aspect-auto max-h-screen min-h-[60vh]">
                </a>
                ${Container.scatter}
            </section>
        `
    } ,
    
    summary: (Path) => {
        return `
            <section class="m-[5vh] w-full max-w-[200vh] inline-flex justify-between">
                <a href="hint?origin=${Path}" class="mr-[5vh]"> 
                    <img src="../assets/grafik.svg" alt="Petunjuk" class="aspect-auto max-h-screen min-h-[60vh]">
                </a>
                ${Container.summary}
            </section>
        `
    } ,
        

}

export { Layout as Layout}