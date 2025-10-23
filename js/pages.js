const pagesList = document.getElementById('pagesList');
const addPageBtn = document.getElementById('addPage');
const editor = document.getElementById('editor');
const blocksContainer = document.getElementById('blocks');
const addTextBlock = document.getElementById('addTextBlock');
const addCheckBlock = document.getElementById('addCheckBlock');
let currentPageIndex = null;

function loadPages() {
  const pages = JSON.parse(localStorage.getItem('pages') || '[]');
  pagesList.innerHTML = '';
  pages.forEach((p,i)=>{
    const li = document.createElement('li');
    li.textContent = p.title;
    li.addEventListener('click', ()=>{
      currentPageIndex = i;
      editor.style.display='block';
      document.getElementById('editorTitle').textContent = p.title;
      renderBlocks();
    });
    pagesList.appendChild(li);
  });
}

function renderBlocks() {
  const pages = JSON.parse(localStorage.getItem('pages') || '[]');
  blocksContainer.innerHTML='';
  if(currentPageIndex===null) return;
  pages[currentPageIndex].blocks.forEach((b, idx)=>{
    const div = document.createElement('div');
    div.className='block';
    if(b.type==='text'){
      div.contentEditable=true;
      div.textContent=b.content;
      div.addEventListener('input',()=> {
        pages[currentPageIndex].blocks[idx].content = div.textContent;
        localStorage.setItem('pages', JSON.stringify(pages));
      });
    } else if(b.type==='check'){
      div.innerHTML = `<input type="checkbox" ${b.checked?'checked':''}> ${b.content}`;
      div.querySelector('input').addEventListener('change', ()=>{
        pages[currentPageIndex].blocks[idx].checked = div.querySelector('input').checked;
        localStorage.setItem('pages', JSON.stringify(pages));
      });
    }
    blocksContainer.appendChild(div);
  });
}

addPageBtn?.addEventListener('click',()=>{
  const title = document.getElementById('pageTitle').value.trim();
  if(!title) return alert('Add page title!');
  const pages = JSON.parse(localStorage.getItem('pages') || '[]');
  pages.push({title, blocks:[]});
  localStorage.setItem('pages', JSON.stringify(pages));
  document.getElementById('pageTitle').value='';
  loadPages();
});

addTextBlock?.addEventListener('click', ()=>{
  const pages = JSON.parse(localStorage.getItem('pages') || '[]');
  if(currentPageIndex===null) return;
  pages[currentPageIndex].blocks.push({type:'text', content:'New Text Block'});
  localStorage.setItem('pages', JSON.stringify(pages));
  renderBlocks();
});

addCheckBlock?.addEventListener('click', ()=>{
  const pages = JSON.parse(localStorage.getItem('pages') || '[]');
  if(currentPageIndex===null) return;
  pages[currentPageIndex].blocks.push({type:'check', content:'New checklist item', checked:false});
  localStorage.setItem('pages', JSON.stringify(pages));
  renderBlocks();
});

loadPages();
