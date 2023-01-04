const deleteText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('#update')

Array.from(editText).forEach((element)=>{
    element.addEventListener('click', editEntry)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteEntry)
})

async function editEntry(){
    const entryId = this.dataset.id
    const first = document.querySelector('#first').value
    const second = document.querySelector('#second').value
    const third = document.querySelector('#third').value
    const fourth = document.querySelector('#fourth').value
    const fifth = document.querySelector('#fifth').value

    try{
        const response = await fetch('editEntry', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': Object(entryId),
                'first': first,
                'second': second,
                'third': third,
                'fourth': fourth,
                'fifth': fifth
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

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