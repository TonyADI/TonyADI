export const createData = async (url, data) => {
    try{
        let response = await fetch(url, {method: 'POST', 
        headers:{'Content-type': 'application/json'}, body: JSON.stringify(data)});
        if(response.ok){
            if(response.status === 201){
                console.log('Data created/updated');
                return(true);
            }
            else if(response.status === 204){
                console.log('Data found!');
                return(true);
            }
        }
        if(response.status === 409){
            console.log('Data could not be created/updated!')
            return(false);
        }
        
        else if(response.status === 401){
            console.log('Credentials do not exist.')
            return(false);
        }
        throw new Error('Create request was invalid.');
    }
    catch(error){
        console.log(error)
    }
}

export const retrieveData = async (url) => {
    try{
        let response = await fetch(url);
        if(response.ok){
            let jsonResponse = await response.json();
            return jsonResponse;
        }
        throw new Error('Fetch request was invalid');
    }
    catch(error){
        console.log(error)
    }
}

export const updateData = async (url, data) => {
    try{
        let response = await fetch(url, {method: 'PUT', 
        headers:{'Content-type': 'application/json'}, body: JSON.stringify(data)});
        if(response.ok){
            console.log('Connection worked, PUT worked');
            if(response.status === 204){
                console.log('Resource was updated.');
                return(true);
            }
        }
        throw new Error('Update request was invalid.')
    }
    catch(error){
        console.log(error);
    }
}

export const deleteData = async (url, data = []) => {
    try{
        let response = await fetch(url, {method: 'DELETE', headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify(data)});
        if(response.ok){
            console.log("Resource deleted");
            return true;
        }
        throw new Error('Delete request was invalid.');
    }
    catch(error){
        console.log(error);
    }
}

