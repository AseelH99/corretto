var itemName=document.getElementById('name')
var itemDesc=document.getElementById('Description')
var itemPrice=document.getElementById('pri')
var addbtn=document.getElementById('add')
var data = document.getElementById('data')
var search= document.getElementById('search')
var updatei=document.getElementById('updateitem')
var offersection=document.getElementById('offer')
var navbar=document.querySelector('.navbar')
var headersection=document.getElementById('head1')
var coffeesection=document.getElementById('coffee')
var crudsection=document.getElementById('crud')
navbar.style.transition='1s'
window.addEventListener('scroll',function(){
  if(this.window.scrollY>=offersection.offsetTop){
    navbar.style.backgroundColor='black'
  }
  else{
    navbar.style.backgroundColor='transparent'
  }
})
window.addEventListener('scroll',function(){
  if(this.window.scrollY>=crudsection.offsetTop){
    navbar.style.backgroundColor='black'
  }
  else{
    navbar.style.backgroundColor='transparent'
  }
})

var currentIndex=0
var items=[]
updatei.style.display='none'
addbtn.onclick=function(e){
e.preventDefault()
addItem()
resetInput()
dispalydata()
console.log(items)
}
function addItem(){
    var item = {

        itemName:itemName.value,
        itemDesc:itemDesc.value,
        itemPrice:itemPrice.value

    }
    items.push(item)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item have been added',
        showConfirmButton: false,
        timer: 1500
      })
}
function resetInput(){
    itemName.value=''
    itemDesc.value=''
    itemPrice.value=''

}
function dispalydata(){
    var result=``
    for(var i=0;i<items.length;i++){
        result+=`
        <tr>
         <td> ${i+1}</td>
         <td> ${items[i].itemName}</td>
         <td> ${items[i].itemDesc}</td>
         <td> ${items[i].itemPrice}</td>
         <td><button class="btn tabelbtn py-2 px-2 text-white" onclick="getitem(${i})">Update</button> </td>
         <td><button class="btn tabelbtn py-2 px-2 text-white" onclick="deleteitem(${i})">Delete</button> </td>
         </tr>
        `
    }
    data.innerHTML=result
}
document.getElementById('deleteall').onclick=function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            items=[]
            data.innerHTML=''
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}
function deleteitem(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            items.splice(index, 1)
            dispalydata()
           Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
   
}
search.onkeyup=function(){
    var result=``
    for(var i=0;i<items.length;i++){
        if(items[i].itemName.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
            <tr>
             <td> ${i+1}</td>
             <td> ${items[i].itemName}</td>
             <td> ${items[i].itemDesc}</td>
             <td> ${items[i].itemPrice}</td>
             <td><button class="btn tabelbtn py-2 px-2 text-white" onclick="getitem(${i})">Update</button> </td>
             <td><button class="btn tabelbtn py-2 px-2 text-white" onclick="deleteitem(${i})">Delete</button> </td>
             </tr>
            ` 
        }
        data.innerHTML=result
    }
}

function getitem(index){

var item = items[index]
currentIndex=index
itemName.value=item.itemName
itemDesc.value=item.itemDesc
itemPrice.value=item.itemPrice
updatei.style.display='inline'
addbtn.style.display='none'

}
updatei.onclick=function(e){
    e.preventDefault()
    var item={
        itemName:itemName.value,
        itemDesc:itemDesc.value,
        itemPrice:itemPrice.value
    }
    items[currentIndex].itemName=item.itemName
    items[currentIndex].itemDesc=itemDesc.value
    items[currentIndex].itemPrice=itemPrice.value
    dispalydata()
    updatei.style.display='none'
    addbtn.style.display='inline'
    resetInput()

}