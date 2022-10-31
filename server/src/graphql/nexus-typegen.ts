/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  create_todo_input: { // input type
    description: string; // String!
    target_date: NexusGenScalars['DateTime']; // DateTime!
  }
  create_user_input: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  login_user_input: { // input type
    email: string; // String!
    password: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthData: { // root type
    access_token: string; // String!
    user_id: number; // Int!
    username: string; // String!
  }
  Mutation: {};
  Query: {};
  RefreshTokenResponse: { // root type
    access_token: string; // String!
  }
  Todo: { // root type
    created_at: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    done: boolean; // Boolean!
    id: number; // Int!
    target_date: NexusGenScalars['DateTime']; // DateTime!
    updated_at: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthData: { // field return type
    access_token: string; // String!
    user_id: number; // Int!
    username: string; // String!
  }
  Mutation: { // field return type
    create_todo: NexusGenRootTypes['Todo']; // Todo!
    create_user: NexusGenRootTypes['User']; // User!
    login_user: NexusGenRootTypes['AuthData']; // AuthData!
    refresh_token: NexusGenRootTypes['RefreshTokenResponse'] | null; // RefreshTokenResponse
  }
  Query: { // field return type
    get_todos: NexusGenRootTypes['Todo'][]; // [Todo!]!
  }
  RefreshTokenResponse: { // field return type
    access_token: string; // String!
  }
  Todo: { // field return type
    author: NexusGenRootTypes['User']; // User!
    created_at: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    done: boolean; // Boolean!
    id: number; // Int!
    target_date: NexusGenScalars['DateTime']; // DateTime!
    updated_at: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    todos: NexusGenRootTypes['Todo'][]; // [Todo!]!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthData: { // field return type name
    access_token: 'String'
    user_id: 'Int'
    username: 'String'
  }
  Mutation: { // field return type name
    create_todo: 'Todo'
    create_user: 'User'
    login_user: 'AuthData'
    refresh_token: 'RefreshTokenResponse'
  }
  Query: { // field return type name
    get_todos: 'Todo'
  }
  RefreshTokenResponse: { // field return type name
    access_token: 'String'
  }
  Todo: { // field return type name
    author: 'User'
    created_at: 'DateTime'
    description: 'String'
    done: 'Boolean'
    id: 'Int'
    target_date: 'DateTime'
    updated_at: 'DateTime'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    todos: 'Todo'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    create_todo: { // args
      todo: NexusGenInputs['create_todo_input']; // create_todo_input!
    }
    create_user: { // args
      user: NexusGenInputs['create_user_input']; // create_user_input!
    }
    login_user: { // args
      login: NexusGenInputs['login_user_input']; // login_user_input!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}