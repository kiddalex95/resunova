export function renderCharts(template,containerId){
    const container=document.getElementById(containerId); container.innerHTML='';
    template.sections?.forEach(sec=>{
        if(sec.title.toLowerCase()==='skills'){
            sec.items.forEach(skill=>{
                const barContainer=document.createElement('div'); barContainer.className='mb-2';
                const label=document.createElement('p'); label.textContent=skill; label.className='text-sm font-semibold mb-1';
                barContainer.appendChild(label);
                const bar=document.createElement('div'); bar.className='w-full bg-gray-200 rounded h-4 relative overflow-hidden';
                const fill=document.createElement('div'); fill.className='bg-blue-600 h-4 rounded'; fill.style.width=`${Math.floor(Math.random()*80)+20}%`;
                bar.appendChild(fill); barContainer.appendChild(bar); container.appendChild(barContainer);
            });
        }
    });
}