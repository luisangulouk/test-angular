import { Injectable,Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs.operators';

@Injectable()
export class DataspaService {

    public result = {};

    constructor(
        private http: Http,
        @Inject('global_options') private options: any) { }

    getAllProfiles() {
        let url = `${this.options.apiEndPoint}/profiles?_page=1`;
        return this.http.get(url)
            .map(this.result = this.extractData)
            .catch(this.handleError);
    }

    getProfilesByBlock(block) {
        let url = `${this.options.apiEndPoint}/profiles?${block}`;
        return this.http.get(url)
            .map(this.result = this.extractData)
            .catch(this.handleError);
    }

    saveProfile(profile) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .put(`${this.options.apiEndPoint}/profiles/${profile.id}`, 
            JSON.stringify(profile), { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getBlocks(blocks:string):Array<any> {
        let blocksList = [];
        let results = [];
        if(blocks.indexOf(",")!==-1){
            blocksList = blocks.split(",");
            blocksList.forEach(item => {
                let elemets = item.split(";");
                elemets[0] = elemets[0].replace(/<http:\/\/localhost:3000\/profiles?|>|\s/g, "");
                elemets[1] = elemets[1].replace(/\srel=[\s\"]|"/g, "");  
                results.push({label: elemets[1], url: elemets[0]});
            });
        }
        return results;
    }

    getProfileByName(name:string) {

        let url = `${this.options.apiEndPoint}&param=${name}`;
        return this.http.get(url)
            .map(this.result = this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let header = res.headers;
        return {body:body, header:header} || {};
    }

    private handleError(response: any) {
        console.error(response);
        return Observable.throw(response);
    }
}

