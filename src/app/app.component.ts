import { Component, OnInit } from '@angular/core';
import { Todo } from '../models';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'realtimeofflinetest';
  
  todos:any[] = [];
  newTodo:string;
  
  ngOnInit(){
    // load todos
    this.loadTodos();
  }
  
  async loadTodos(){
    let todos:any = await DataStore.query(Todo);
    console.log(todos);
  }
  
  async addTodo() {
    
    const newTask = await DataStore.save(new Todo({
      name: this.newTodo
    }))
    
    this.todos.push(newTask);
    this.newTodo = "";
  }
  
}
