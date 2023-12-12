function ActiveNavigation( path ){
    const items = document.querySelectorAll(".nav-item")
    items.forEach((item) => {
        if( item.getAttribute("id") === path){
            item.classList.add("font-semibold")
            item.classList.add("border-b-8")
            item.classList.add("w-fit")
        }
    })
}