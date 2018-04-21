using Entities;
using Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace DataAccessLayer
{
    public class DataAccessManager : IDataAccessManager, IDisposable
    {
        private const string ConnectionString =
            "Sql Server Connection string goes here";

        private SqlConnection _connection = null;

        private SqlCommand _sqlCommand = null;

        public DataAccessManager()
        {
            _connection = new SqlConnection(ConnectionString);
            _sqlCommand = new SqlCommand("",_connection);
        }

        public int AddContact(IContact contact)
        {
            _connection.Open();
            int generatedId=0;
            _sqlCommand.CommandText=$"insert into ContactsData (FirstName, LastName, Email, PhoneNumber,  Status) values ('{contact.FirstName}','{contact.LastName}','{contact.Email}','{contact.PhoneNumber}',{Convert.ToInt16(contact.Status).ToString()})";
            _sqlCommand.ExecuteNonQuery();
            _sqlCommand.CommandText= "select MAX(ContactId) from ContactsData";
            using (SqlDataReader reader = _sqlCommand.ExecuteReader())
            {
               if(reader.Read())
                {
                    generatedId = Convert.ToInt32(reader[0]);
                }
            }
            _connection.Close();
            return generatedId;
        }

        public void DeleteContact(int contactIdToBeDeleted)
        {
            _connection.Open();
            _sqlCommand.CommandText= $"delete from ContactsData where ContactId='{contactIdToBeDeleted}'";
            int rowsDeleted = _sqlCommand.ExecuteNonQuery();
            _connection.Close();
        }

        public void EditContact(IContact contact)
        {
            _connection.Open();
            _sqlCommand.CommandText = $"update ContactsData set FirstName='{contact.FirstName}', LastName='{contact.LastName}', Email='{contact.Email}', PhoneNumber='{contact.PhoneNumber}', Status='{contact.Status}' where ContactId='{contact.Id}'";
            _sqlCommand.ExecuteNonQuery();
            _connection.Close();
        }

        public List<IContact> GetAllContacts()
        {
            _connection.Open();
            _sqlCommand.CommandText = "Select * from ContactsData";
            List<IContact> contacts = new List<IContact>();
            using (SqlDataReader reader = _sqlCommand.ExecuteReader())
            {
                while (reader.Read())
                {
                    contacts.Add(new Contact()
                    {
                        Id = Convert.ToInt32(reader[0]),
                        FirstName = reader[1].ToString(),
                        LastName = reader[2].ToString(),
                        Email = reader[3].ToString(),
                        PhoneNumber = reader[4].ToString(),
                        Status = reader[5].ToString() == "1"
                    });
                }
            }
            _connection.Close();
            return contacts;
        }

        public void Dispose()
        {
            _connection.Close();
            _connection = null;
            _sqlCommand = null;
        }

        ~DataAccessManager()
        {
            Dispose();
            GC.SuppressFinalize(this);
        }

    }
}
