
// const listboxControls = document.querySelector('.listbox-controls') // border-radius

// Show or hide listboxs 
export const displayListbox = ($listboxList) => {
    $listboxList.classList.remove('hidden')
    //$listboxList.classList.add('show')

}
export const hideListbox = ($listboxList) => {
    $listboxList.classList.add('hidden')
    //$listboxList.classList.remove('show')
    // listboxControls.style.borderRadius = "5px" // border-radius
}
/* 
// Close dropdown if user clicks outside of it // ////////////////// fonction exportée ? 
window.onclick = function (event) { //////////////////////////////// problème : click dans la listbox ferme tout
    if (!event.target.matches('.fa-chevron-down')) {
      const listboxs = document.getElementsByClassName('listbox-list'); 
      let i;
      for (i = 0; i < listboxs.length; i++) {
        const openedListbox = listboxs[i];
        if (!openedListbox.classList.contains('hidden')) {
            // openedListbox.classList.remove('show');
            openedListbox.classList.add('hidden');
        }
      }
    }
  }; 
 */
