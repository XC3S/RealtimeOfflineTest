import { Component, OnInit } from '@angular/core';
import { Todo } from '../models';

import * as _ from 'lodash';;

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  usernameAttributes = "email"; 
  title = 'realtimeofflinetest';
  
  todos:any[] = [];
  newTodo:string;
  editTodo:string;
  
  editId:string = "";
  
  ngOnInit(){
    this.loadTodos();
  }
  
  async loadTodos(){
    let todos = await DataStore.query<Todo>(Todo);
    let newTodos = _.map(todos, item => {
      return {
        id: item.id,
        name: item.name
      };
    });
    
    this.todos = newTodos;
  }
  
  async addTodo() {
    const newTask = await DataStore.save(new Todo({
      name: this.newTodo
    }))
    
    const created = newTask[0]
    
    this.todos.push({
      id: created.id,
      name: created.name
    });
    this.newTodo = "";
  }
  
  async updateTodo(updateId,updateName){
    // update local ref
    let todo = _.find(this.todos,todo => todo.id === updateId);
    todo.name = updateName;
    
    // update datastore
    const orginal = await DataStore.query<Todo>(Todo,updateId);
    await DataStore.save(
      Todo.copyOf(orginal, updated => {
        updated.name = updateName;
      })
    )
    
    // leave edit mode
    this.editId = "";
  }
  
  async delete(deleteTodo){
    // remote local ref
   _.remove(this.todos,todo => todo.id === deleteTodo.id);
    
    // remove from datastore
    const toDelete = await DataStore.query<Todo>(Todo, deleteTodo.id);
    DataStore.delete(toDelete);
  }
  
  edit(task:Todo){
    this.editId = task.id;
    this.editTodo = task.name;
  }
}
