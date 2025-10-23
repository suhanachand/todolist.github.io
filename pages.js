// Pages & blocks (simple)
document.addEventListener('DOMContentLoaded',()=>{
  const addPageBtn = document.getElementById('addPage');
  const pageTitle = document.getElementById('pageTitle');
  const pagesList = document.getElementById('pagesList');
  const editor = document.getElementById('editor');
  const editorTitle = document.getElementById('editorTitle');
  const blocks = document.getElementById('blocks');
  let pages = JSON.parse(localStorage.getItem('sol_pages')||'[]');
  let current = null;

  function renderPages(){
    pagesList.innerHTML='';
    pages.forEach((p,i)=>{
      const el=document.createElement('div'); el.className='card';
      el.innerHTML = `<div style="display:flex;justify-content:space-between"><div><strong>${p.title}</strong></div><div><button class="icon">Open</button></div></div>`;
      el.querySelector('button').addEventListener('click', ()=>openPage(i));
      pagesList.appendChild(el);
    });
  }
  function openPage(i){
    current = i;
    const p = pages[i];
    editor.style.display='block';
    editorTitle.innerText = p.title;
    blocks.innerHTML = '';
    p.blocks.forEach(b=>{
      const el=document.createElement('div'); el.className='block'; el.contentEditable=true; el.innerHTML = b.content;
      blocks.appendChild(el);
    });
  }
  addPageBtn.addEventListener('click', ()=>{
    const t = pageTitle.value.trim()||'Untitled';
    pages.push({title:t, blocks:[]});
    localStorage.setItem('sol_pages',JSON.stringify(pages));
    pageTitle.value=''; renderPages();
  });

  document.getElementById('addTextBlock')?.addEventListener('click',()=>{
    if(current===null) return alert('Open a page first');
    const el=document.createElement('div'); el.className='block'; el.contentEditable=true; el.innerHTML='<p>New text</p>';
    blocks.appendChild(el);
    pages[current].blocks.push({type:'text', content: el.innerHTML});
    localStorage.setItem('sol_pages',JSON.stringify(pages));
  });

  // autosave block content on blur
  document.addEventListener('focusout', e=>{
    if(current===null) return;
    if(e.target && e.target.classList && e.target.classList.contains('block')){
      pages[current].blocks = Array.from(blocks.children).map(ch => ({type:'text', content: ch.innerHTML}));
      localStorage.setItem('sol_pages',JSON.stringify(pages));
    }
  });

  renderPages();
});
