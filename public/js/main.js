const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteEntry)
})

async function deleteEntry(){
    const bOdo = this.parentNode.childNodes[5].innerText
    const eOdo = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'begOdo': bOdo,
              'endOdo': eOdo
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}