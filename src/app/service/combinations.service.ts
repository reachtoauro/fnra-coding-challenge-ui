import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Combination } from '../model/combination.model'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CombinationsService{
    constructor(private httpClient: HttpClient){}
    combinations: Combination[];
    private combinationUpdated = new Subject<{combinations: Combination[]}>();
    private url = "http://localhost:8080/api/v1/generate-letter-combinations";

    getUpdateListner(){
        return this.combinationUpdated.asObservable();
    }

    fetchCombinations(phoneNumber: string) {
        return this.httpClient.get<Combination[]>(this.url +'/'+ phoneNumber)
                    .pipe(map((resData) => {
                        return { combinations: resData.map((combinations) => {
                            return {
                                index: combinations.index,
                                combination: combinations.combination
                            };
                        })};
                    } ))
                    .subscribe((transformedData) => {
                        this.combinations = transformedData.combinations;
                        this.combinationUpdated.next({combinations: [...this.combinations]});
                    });
                    //.toPromise()
                    //.then(res => <Combination[]> res)
                    //.then(data => { return data; });
    }

    /* getCombinations(phoneNumber: string){
        //const reqBody = { "phoneNumber": phoneNumber };
        this.httpClient.get<{ combinations: Combination[], totalCount: number}>(this.url +'/'+ phoneNumber, {headers: 
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
        .subscribe((data) => {
           this.combinations = data.combinations;
           this.totalCount = data.totalCount;
            this.updtedCombinations.next([...this.combinations]);
            this.updatedTotalCount.next(this.totalCount);
        });
    }

    getUpdatedCombinations(){
        return this.updtedCombinations.asObservable();
    }

    getUpdatedTotalCount(){
        return this.updatedTotalCount.asObservable();
    }
 */

}