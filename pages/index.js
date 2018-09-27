import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Teamcity Servers</h1>
    <ul>
      {props.servers.map(server => (
        <li key={server.ip}>
          <h3>IP:{server.ip}</h3>
          {/* <Link as={`/p/${server.ip}`} href="">
            <a>{server.ip}</a>
          </Link> */}
          <h4>Disk Details</h4>
          <table>
          <tr>
            <th>Disk Name</th>
            <th>Total Size</th>
            <th>Avail Size</th>
            <th>Used Size</th>
            <th>Used %</th>
            <th>mounted_path</th>
          </tr>
          {server['disk_data'].map(disk => (
            <tr>
              <td>{disk.disk_name}</td>
              <td>{disk.total_size}</td>
              <td>{disk.avail_size}</td>
              <td>{disk.used_size}</td>
              <td>{disk.used_percent}</td>
              <td>{disk.mounted_path}</td>
            </tr>
          ))}
          <h4>Top folders</h4>
         </table>
          <table>
          <tr>
            <th>Folder Name</th>
            <th>Memory</th>
          </tr>
          {server['top_folders'].map(folder => (
            <tr>
              <td>{folder.name}</td>
              <td>{folder.size}</td>
            </tr>
          ))}
         </table>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      h3 {
        color: blue
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    
    tr:nth-child(even) {
        background-color: #dddddd;
    }
    `}</style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://monitor-rest.cfapps.io/')
  const data = await res.json()
  //console.log(`Show data fetched. Count: ${data.length}`)

  return {
    servers: data['data']['data']
  }
}

export default Index