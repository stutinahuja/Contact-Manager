namespace Interfaces
{
    public interface IContact
    {
        string FirstName { get; set; }
        string LastName { get; set; }
        string Email { get; set; }
        string PhoneNumber { get; set; }
        bool Status { get; set; }
        int Id { get; set; }
    }
}
