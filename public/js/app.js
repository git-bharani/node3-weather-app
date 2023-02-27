console.log('Client side javascript file is loading!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('#location')
const err_p = document.querySelector('#err')
const msg_p = document.querySelector('#msg')

// Listering the event by submitting form
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    err_p.textContent = 'Loading...'
    msg_p.textContent = ''
    const location = search.value
    // fetch the data from weather API
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                err_p.textContent = data.error
                msg_p.textContent = ''
                console.log('%cERR: Weather API | '+data.error, 'color: red')
            }else{
                err_p.textContent = ''
                msg_p.textContent = "The current weather at "+ data.location + " is "+ data.forecast
            }
        })
    })
})