
import React,{Component} from 'react'

class Table extends Component{

  constructor(props){
    super(props)
    this.state={
      users:[],
      isLoading:false,
      isError:false
    }
  }
  //async function get request
  async componentDidMount(){
    this.setState({isLoading:true})

    const response = await fetch("https://restcountries.eu/rest/v2/all")

    if(response.ok)
{
    const users = await response.json()  
    console.log(users)
    this.setState({users,isLoading:false})
   }else{
     this.setState({isError:true,isLoading:false})
   }
   }

   renderTableHeader =()=>{
         return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
           {attr.toLocaleUpperCase()}
         </th>)
   }
   renderTableRows=()=>{
        return this.state.users.map(user =>{
          return(
            <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.topLevelDomain}</td>
                <td>{user.alpha2Code}</td>
                <td>{user.alpha3Code}</td>
                <td>{user.callingCodes}</td>
                <td>{user.capital}</td>
                <td>{user.altSpellings[1]}</td>
                <td>{user.region}</td>
                <td>{user.subregion}</td>
                <td>{user.population}</td>
                <td>{user.nativeName}</td>
                <td>{user.demonym}</td>
                <td>{user.area}</td>
                <td>{user.gini}</td>
                <td>{user.timezones[0]}</td>
                <td>{user.borders[0]}</td>
                <td>{user.nativeName}</td>
                <td>{user.numericCode}</td>
                {/* <td>{user.currencies[0].name}</td> */}
                 <td>{user.currencies.map((cur,k)=>{
                   return (<td key={k}>{cur.name}</td>)
                 })}</td>
                <td>
                  {user.languages.map((lang,k1)=>{
                    return(<p key={k1}>{lang.name}</p>)
                  })}                
                  </td>
                   

                  <td>{user.translations.br}</td>
                 <td><a href={user.flag}> {user.flag} </a></td>
                 <td>{user.subregion}</td>
                 <td>{user.cioc}</td>
                
            </tr> 
          )
        })

   }
  render(){
    const{users,isLoading,isError}=this.state

    if(isLoading){
      return <div>Loading...</div>
    }
    if(isError){
      return <div>Error...</div>
    }
    return users.length>0
    ?(
<table>

  <thead>
    <tr>
        {this.renderTableHeader()}
    </tr>
  </thead>
      <tbody>
        {this.renderTableRows()}
      </tbody>
    
</table>
    ):
    (
      <div>No Details</div>
    )
  }
}

export default Table