console.log('Postman');
let error = false;
let parameterCount = 1;

let customParameters = document.getElementById('customParameters');
customParameters.style.display = 'none';

let json = document.getElementById('json');
json.addEventListener('click', (e)=>{
    let customParameters = document.getElementById('customParameters');
    customParameters.style.display = 'none'; // Learned 1

    let jsonTextArea = document.getElementById('jsonTextArea');
    jsonTextArea.style.display = 'block';    // Learned 2
});

let custom = document.getElementById('custom');
custom.addEventListener('click', (e)=>{
    let jsonTextArea = document.getElementById('jsonTextArea');
    jsonTextArea.style.display = 'none';

    let customParameters = document.getElementById('customParameters');
    customParameters.style.display = 'block';
});

let addParameters = document.getElementById('addParameters');
addParameters.addEventListener('click', (e)=>{
    e.preventDefault();
    let params = document.getElementById('params');

    //need to create a new div element
    let newEle = document.createElement('div');
    newEle.innerHTML = `
        <div class="row">
        <label class="col-3" for="custom">Parameter ${parameterCount+1}</label>
        <div class="col-4">
            <input type="text" class="form-control" placeholder="key" aria-label="key" id="key${parameterCount+1}">
        </div>
        <div class="col-4">
            <input type="text" class="form-control" placeholder="value" aria-label="value" id="val${parameterCount+1}">
        </div>
        <button class="col-1 btn-primary removeElement" type="submit">-</button>
    </div><br>
    `;

    parameterCount++;
    params.appendChild(newEle);

    let removeElement = document.getElementsByClassName('removeElement');
    for (let iterator of removeElement) {
        iterator.addEventListener('click', (e)=>{
            e.preventDefault();
            e.target.parentElement.remove();
        });
    }
});

// what will happen when we will click send button
let send = document.getElementById('send');
send.addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById('responseValue').innerText = 'Processing your request..';

    // fetching url
    let urlentered = document.getElementById('url');
    url = urlentered.value;

    // fetching request type
    let requestType = document.getElementById('get').checked ? 'get' : 'post';

    // fetching content type
    let contentType = document.getElementById('json').checked ? 'json' : 'custom';

    if(url == ''){
        error = true;
        document.getElementById('responseValue').innerText = 'URL is missing';
        return;
    }

    // getting json body if content type is json
    let data = '';
    if(contentType == 'json'){
        requestBody = document.getElementById('jsonValue').value;
    }
    else{
        let parameters = {};
        for (let i = 0; i < parameterCount + 1; i++) {
            if(document.getElementById(`key${i+1}`) != undefined){
                let key = document.getElementById(`key${i+1}`).value;
                let value = document.getElementById(`val${i+1}`).value;
                parameters[key] = value;    
            }
        }
        data = JSON.stringify(parameters);
    }

    if(requestType == 'get'){
        fetch(url, {
            method: 'GET'
        }).then((response)=>{
            return response.text();
        }).then((data)=>{
            document.getElementById('responseValue').innerText = data;
        }).catch((error)=>{
            document.getElementById('responseValue').innerText = error;
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: requestBody
        }).then((response)=>{
            return response.text();
        }).then((data)=>{
            document.getElementById('responseValue').innerText = data;
        }).catch((error)=>{
            document.getElementById('responseValue').innerText = error;
        });
    }    
});