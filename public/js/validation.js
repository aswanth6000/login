const form = document.getElementById('myform')
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const nameInput = document.getElementById('name')
    const passInput = document.getElementById('pass')
    
    if(nameInput.value.trim() === ''){
        alert("Name required")
        return;
    }
    if(passInput.value.length < 6){
        alert("Password must be 6 characters long ")
        return;
    }
    
    form.submit()
})