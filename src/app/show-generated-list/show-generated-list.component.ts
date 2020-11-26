import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Combination } from '../model/combination.model';
import { CombinationsService } from '../service/combinations.service';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'show-generated-list',
  templateUrl: './show-generated-list.component.html',
  styleUrls: [
    './show-generated-list.component.css'
]
})
export class ShowGeneratedListComponent implements OnInit{
  isLoading=false;
  displayedColumns = [
    {"header": "index"}, 
    {"header": "combination"}
  ];
  dataSource: MatTableDataSource<Combination>;
  combinations: Combination[];
  totalPosts=0;
  currentPage=1;
  postsPerPage=10;
  pageSizeOptions=[10,25,50];
  phoneNumber: string;
  totalRecords: number;
  loading: boolean;

  constructor(public combinationsService: CombinationsService){
    this.dataSource = new MatTableDataSource(this.combinations);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private combinationSub = new Subscription;
    ngOnDestroy(): void {
        this.combinationSub.unsubscribe();
    }
    ngOnInit(){
        //this.posts= this.postsService.getPosts();
        this.isLoading = true;
        //this.combinationsService.getP(this.postsPerPage, this.currentPage);
        this.combinationSub = this.combinationsService.getUpdateListner()
        .subscribe((combinationData: {combinations: Combination[]}) => {
            this.isLoading=false;
            this.combinations=combinationData.combinations;
            this.totalRecords = combinationData.combinations.length
        });
    }

  generate(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true;
   
    this.isLoading = true;
    this.phoneNumber=form.value.phoneNumber;
        //this.combinationsService.getP(this.postsPerPage, this.currentPage);
        this.combinationsService.fetchCombinations(form.value.phoneNumber);
        this.totalPosts = this.totalRecords;
        alert(this.totalPosts);
      this.loading = true;
  }

  onChangePage(pageData: PageEvent){
    this.isLoading=true;
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize;
    this.combinationsService.fetchCombinations(this.phoneNumber);
}
}