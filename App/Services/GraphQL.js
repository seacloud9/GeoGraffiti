
export const createLocation = `mutation createNote($id: ID!, $lat: Float! $long: Float!, $user: User, $data: String!){
  createNote(input:{
    lat: $lat,
    long: $long,
    user: $user,
    data: $data
  }){
    __typename
    id
    lat
    long
    user
    data
  }
}`

export const readLocation = `query listNotes{
  listNotes{
    items{
      __typename
      id
      lat
      long
      user
      data
    }
  }
}`

export const updateLocation = `mutation updateNote($id: ID!, $lat: Float! $long: Float!, $user: User, $data: String!){
  updateNote(input:{
    id: $id,
    lat: $lat,
    long: $long,
    user: $user,
    data: $data
  }){
    __typename
    id
    lat
    long
    user
    data
  }
}`

export const deleteLocation = `mutation deleteNote($id: ID!){
  deleteNote(input:{
    id: $id
  }){
    __typename
    id
    lat
    long
    user
    data
  }
}`
