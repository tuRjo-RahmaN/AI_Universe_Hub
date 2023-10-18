const ai = async(datalimit) =>
{
    loader(true);
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await (response.json())
    
    displayLimited(data.data.tools,datalimit);
}

// Display 6 AI cards at starting
const displayLimited = (aiCards,datalimit) =>
{
    const seeMoreBtn = document.getElementById('see-more-btn');

    if(datalimit === 6)
    {   const tmp = 0;
        aiCards = aiCards.slice(0,6);
        seeMoreBtn.classList.remove('hidden');
    }

    else
        seeMoreBtn.classList.add('hidden');

    displayAi(aiCards);
    loader(false);

// Sort By Date button
    document.getElementById('sort-by-date').addEventListener('click',function(){
        const aiContainer = document.getElementById('ai-container');
        aiContainer.innerHTML = '';
        loader(true);

        const sorted = (a,b) =>
        {
            const dateA = new Date (a.published_in);
            const dateB = new Date (b.published_in);

            if(dateA < dateB)
                return 1;
            else if (dateA > dateB)
                return -1;
            return 0;
        };
    
        displayAi(aiCards.sort(sorted));
        loader(false);
    });
}

// Display all cards
function displayAi(aiCards)
{
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerHTML = '';

    aiCards.forEach(aiCard =>
        {
            const divAi = document.createElement('div');
            divAi.innerHTML = 
            `<div class="card bg-base-100 p-4 lg:mb-0 mb-5 h-full border shadow-xl">
                <figure>
                    <img class="rounded-lg h-40" src="${aiCard.image}" alt="Ai" />
                </figure>

                <div class="card-body border-b-2 p-0">
                    <h2 class="card-title font-bold text-lg mt-5">Features</h2>

                    <ul class="text-ash text-xs mb-5"> 
                        <li>${aiCard.features[0] ? '1. ' + aiCard.features[0] : ''}</li>
                        <li>${aiCard.features[1] ? '2. ' + aiCard.features[1] : ''}</li>
                        <li>${aiCard.features[2] ? '3. ' + aiCard.features[2] : ''}</li>  
                    </ul>
                </div>

                <div class="card-actions justify-between items-center mt-4">
                    <div class="mb-4"> 
                        <h2 class="card-title font-bold text-lg mb-2">${aiCard.name}</h2>
                        <div class="flex items-center gap-1 text-ash text-xs"> 
                            <i class="fa-solid fa-calendar-days"></i>
                            <p>${aiCard.published_in}</p>
                        </div>
                    </div>
                    
                    <button onclick="showDetails('${aiCard.id}',my_modal_4.showModal())" class="btn btn-circle btn-sm bg-lightWhite border-0"><i class="fa-solid fa-arrow-right text-orange"></i></button>
                </div>
            </div>
            `
            aiContainer.appendChild(divAi);
        })
}

// See More button 
document.getElementById('see-more-btn').addEventListener('click', function()
{
    loader(true);
    const seeMoreBtn = document.getElementById('see-more-btn');
    seeMoreBtn.classList.add('hidden');

//Calling all 12 AI cards
    ai(12);
})

// Loader part
const loader = status =>
{
    const loader = document.getElementById('loader');

    if(status)
        loader.classList.remove('hidden');
    else
        loader.classList.add('hidden');   
}

// Card Details here
const showDetails = async(id) =>
{
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await (response.json())

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = ''
    showDetailsContainer.innerHTML =
    `
    <div class="bg-offwhite p-4 rounded-lg border border-orange">
        <h2 class="text-center font-bold mb-4">${data.data.description}</h2>

        <div class="lg:flex md:flex gap-4 grid justify-center mb-4 text-xs text-center font-bold">
            <p class="grid text-green-500 bg-white lg:mb-0 mb-2 p-3 w-24 rounded-xl content-center">${data.data.pricing ? data.data.pricing[0].price : 'Free of Cost/'} <br> ${data.data.pricing ? data.data.pricing[0].plan : 'Basic'}</p>

            <p class="grid text-blue-500 bg-white lg:mb-0 mb-2 p-3 w-24 rounded-xl content-center">${data.data.pricing ? data.data.pricing[1].price : 'Free of Cost/'} <br> ${data.data.pricing ? data.data.pricing[1].plan : 'Pro'}</p>

            <p class="grid text-orange bg-white p-3 w-24 rounded-xl content-center">${data.data.pricing ? data.data.pricing[2].price : 'Free of Cost/'} <br> ${data.data.pricing ? data.data.pricing[2].plan : 'Enterprise'}</p>
        </div>

        <div class="flex justify-between">
            <div class="lg:mb-0 mb-5">
                <h2 class="font-bold mb-2">Features</h2>
                <ul>
                    <li class="text-ash text-xs mb-1">${data.data.features[1].feature_name}</li>
                    <li class="text-ash text-xs mb-1">${data.data.features[2].feature_name}</li>
                    <li class="text-ash text-xs mb-1">${data.data.features[3].feature_name}</li>
                    <li class="text-ash text-xs">${data.data.features[4] ? data.data.features[4].feature_name : ''}</li>
                </ul>
            </div>

            <div class="lg:mb-0 mb-5">
                <h2 class="font-bold mb-2">Integrations</h2>
                <ul> 
                ${
                    data.data.integrations ?

                    `<li class="text-ash text-xs mb-1">${data.data.integrations[0] ? data.data.integrations[0] : 'No Data Found'}</li>
                    <li class="text-ash text-xs mb-1">${data.data.integrations[1] ? data.data.integrations[1] : ''}</li>
                    <li class="text-ash text-xs mb-1">${data.data.integrations[2] ? data.data.integrations[2] : ''}</li>
                    <li class="text-ash text-xs mb-1">${data.data.integrations[3] ? data.data.integrations[3] : ''}</li>
                    <li class="text-ash text-xs mb-1">${data.data.integrations[4] ? data.data.integrations[4] : ''}</li>
                    <li class="text-ash text-xs">${data.data.integrations[5] ? data.data.integrations[5] : ''}</li>
                    `
                    :
                    
                    `<p class="text-ash text-xs">No Data Found</p>`
                }
                </ul>
            </div>
        </div>
    </div>

    <div class="border p-4 rounded-lg text-center">
        <div class="relative"> 
            <img class="rounded-xl mb-4" src="${data.data.image_link[0]}" alt="${data.data.tool_name}">
            <div>

            ${
                data.data.accuracy.score ?

                `<p class="bg-orange rounded p-3 w-28 font-medium text-white text-xs absolute top-2 right-2">${data.data.accuracy.score*100 + '% accuracy'}</p>
                `
                :

                ''
            }
            </div>
        </div>

        <h2 class="font-bold mb-4">${data.data.input_output_examples  ? data.data.input_output_examples[0].input : 'Can you give any example ?'}</h2>
        <p class="text-ash text-xs">${data.data.input_output_examples ? data.data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
    </div>
    `
}
//Calling 6 AI cards in initial 
ai(6);