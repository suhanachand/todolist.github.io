document.addEventListener('DOMContentLoaded', ()=>{
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
    if(pages.length===0) pagesList.innerHTML = '<div class="small-muted">No pages yet.</div>';
    pages.forEach((p,i)=>{
      const el = document.createElement('div'); el.className='card';
      const open = document.createElement('button'); open.className='btn'; open.textContent='Open';
      open.addEventListener('click', ()=> openPage(i));
      el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${p.title}</strong></div></div>`;
      el.querySelector('div').appendChild(open);
      pagesList.appendChild(el);
    });
  }

  addPageBtn.addEventListener('click', ()=>{
    const t = pageTitle.value.trim()||'Untitled';
    pages.push({title:t, blocks:[]});
    localStorage.setItem('sol_pages', JSON.stringify(pages));
    pageTitle.value=''; renderPages();
  });

  function openPage(i){
    current = i;
    const p = pages[i];
    editor.style.display='block';
    editorTitle.innerText = p.title;
    blocks.innerHTML = '';
    p.blocks.forEach(b=>{
      const el = document.createElement('div'); el.className='block'; el.contentEditable=true; el.innerHTML = b.content;
      blocks.appendChild(el);
    });
  }

  document.getElementById('addTextBlock')?.addEventListener('click', ()=>{
    if(current===null) return alert('Open a page first');
    const el = document.createElement('div'); el.className='block'; el.contentEditable=true; el.innerHTML = '<p>New text</p>';
    blocks.appendChild(el);
    pages[current].blocks.push({type:'text', content: el.innerHTML});
    localStorage.setItem('sol_pages', JSON.stringify(pages));
  });

  document.addEventListener('focusout', e=>{
    if(current===null) return;
    if(e.target && e.target.classList && e.target.classList.contains('block')){
      pages[current].blocks = Array.from(blocks.children).map(ch => ({type:'text', content: ch.innerHTML}));
      localStorage.setItem('sol_pages', JSON.stringify(pages));
    }
  });

  renderPages();
});
