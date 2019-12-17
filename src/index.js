// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
let quoteUL = document.getElementById('quote-list')
let form = document.querySelector('#new-quote-form')

form.addEventListener('submit', addQuote)

function bogusFetch(){
  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(r => r.json())
  .then(data => {
    data.forEach(domsIdea)
  })
}

function domsIdea(quote) {
  const quoteLI = document.createElement('li')

  quoteLI.className = 'quote-card'
  quoteLI.innerHTML = `<blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
       <footer class="blockquote-footer">${quote.author}</footer>
       <br>
       <button id=${quote.id + '-like-button'} class='btn-success' data-id=${quote.id}>Likes: <span>${quote.likes.length}</span></button>
       <button class='btn-danger' data-id=${quote.id} >Delete</button>
     </blockquote>
     `
     console.log('wot')
  let deleteBtn = quoteLI.querySelector('button.btn-danger')
  deleteBtn.addEventListener('click', smarterCallbackDeleteButton)

  let likeBtn = quoteLI.querySelector('button.btn-success')
  likeBtn.addEventListener('click', smarterCallbackLikeButton)

  quoteUL.append(quoteLI)
}

function deleteOffTheDOM(){
  // grab id from fetch function
  // grab all lis in ulList
  // iterate
  // if id matches the id of the li
  // remove
  // oltherwise, keep

}

function addQuote(e) {
  e.preventDefault()
  let quote = e.target['new-quote'].value
  let author = e.target['author'].value
  console.log(quote)
  console.log(author)

  fetch('http://localhost:3000/quotes?_embed=likes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      quote: quote,
      author
    })
  })
  .then(r => r.json())
  .then(data => {
    domsIdea(data)
    form.reset()
  })
}

function smarterCallbackDeleteButton(e){
  let id = e.target.dataset.id
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: 'DELETE'
  })
  .then(r => r.json())
  .then(data => {
    e.target.parentElement.parentElement.remove()
  })
}

function smarterCallbackLikeButton(e){
  let id = e.target.dataset.id
  fetch(`http://localhost:3000/likes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      quoteId: parseInt(id)
    })
  })
  .then(r => r.json())
  .then(data => {
    let ihateyoudom = quoteUL.querySelectorAll(`btn-success`)
    let thatscheatingdom = e.target.firstElementChild
    thatscheatingdom.innerText = parseInt(thatscheatingdom.innerText) + 1

    // querySelectorAll btn-success
    // iterate
    // if button.dataset.id === id (from above e.target) or data.quoteId
    // replace span innerText +1
  })
}


bogusFetch()
//
