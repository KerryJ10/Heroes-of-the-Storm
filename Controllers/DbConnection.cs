using MySql.Data.MySqlClient;

namespace Heroes.Controllers
{
	public class DbConnection
	{
		private DbConnection()
		{
		}

		public string DatabaseName { get; set; } = string.Empty;

		public MySqlConnection Connection { get; private set; } = null;

		private static DbConnection _instance = null;
		public static DbConnection Instance()
		{
			return _instance ??= new DbConnection();
		}

		public bool IsConnect()
		{
			if (Connection == null)
			{
				if (string.IsNullOrEmpty(DatabaseName))
					return false;
				var connstring =
					$"Server=hotsinfo.cs8fmilb3nfr.us-east-2.rds.amazonaws.com; Port=3306; database={DatabaseName}; UID=admin; password=3514679Kj????";
				Connection = new MySqlConnection(connstring);
				Connection.Open();
			}

			return true;
		}

		public void Close()
		{
			Connection.Close();
		}
	}
}
