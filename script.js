const input = document.querySelector("#newItem")
const danger = document.querySelector(".invisible")
const form = document.querySelector("form")
const ul = document.querySelector("ul")
const close = document.querySelector('i.ph.ph-x')
const largeTrash = document.querySelector('#largeTrash')
const init = document.querySelector("#init")

function updateSelectedCount() {
  const selectedItems = document.querySelectorAll(".ph-check-square")
  const totalSelected = selectedItems.length

  if (totalSelected > 1) {
    largeTrash.style.display = "block"
  } else {
    largeTrash.style.display = "none"
  }
}

function checkListEmpty() {
  if(ul.children.length === 0) {
    init.classList.remove("invisible")
  }else {
    init.classList.add("invisible")
  }
}

ul.addEventListener("click", (event) => {
  const target = event.target
  
  if (target.classList.contains("ph-square") || target.classList.contains("ph-check-square")) {
    
    const icon = target.closest("label").querySelector("i")
    
    if(icon.classList.contains("ph-square")){
      icon.classList.remove("ph", "ph-square")
      icon.classList.add("ph-fill", "ph-check-square")
    } else{
      icon.classList.add("ph", "ph-square")
      icon.classList.remove("ph-fill", "ph-check-square")
    }
    updateSelectedCount()
    return
  }
  
  if (target.classList.contains("trash")) {
    const list = target.closest("li")
    const checkbox = list.querySelector(".ph-check-square")
    if(checkbox) {
      if(list) {
        list.remove()
        checkListEmpty()
        
        if(danger) {
          danger.classList.remove("invisible")
          danger.classList.add("danger")
        }
  
        checkListEmpty()
        updateSelectedCount()
      }
    }
  }      
})

largeTrash.addEventListener("click", () => {
  const selectedItems = document.querySelectorAll(".ph-check-square")

  if (selectedItems.length > 1) {
    const confirmDelete = confirm("Você tem certeza que deseja excluir todos os itens selecionados?")
    
    if (confirmDelete) {
      selectedItems.forEach(item => {
        const listItem = item.closest("li")
        if (listItem) {
          listItem.remove()

          if(danger) {
            danger.classList.remove("invisible")
            danger.classList.add("danger")
          }
        }
      });

      checkListEmpty()
      updateSelectedCount();
    }
  }
})

function capitalizeFirstLetter(text) {
  return text.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
}

form.onsubmit = (event) => {
      event.preventDefault()
      let value = input.value
      const regex = /\d+/g

      value = capitalizeFirstLetter(value)
      
      if (regex.test(value) || value === "") {
        const value = input.value.replace(regex, "")
        input.classList.add("input-error")
        alert("Por favor, não digite números ou caracteres especiais como $#* entre outros.")
        return
      }
      input.classList.remove("input-error")
    
      const newLi = document.createElement("li")
      const newLabel = document.createElement("label")
      const checkSquare = document.createElement("i")
      const newSpan = document.createElement("span")
      const newTrash = document.createElement("i")
    
      newTrash.classList.add("ph", "ph-trash", "trash")
      checkSquare.classList.add("ph", "ph-square")
      newSpan.textContent = value
    
      newLabel.append(checkSquare, newSpan)
      newLi.append(newLabel, newTrash)
      ul.prepend(newLi)
    
      input.value = ""

      checkListEmpty()
      updateSelectedCount()
}
    
close.onclick = () => {
      danger.classList.add("invisible")
      danger.classList.remove("danger")
}