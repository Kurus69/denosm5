interface Isql {
  [index: string]: string;
}
const querysql = {} as Isql;
querysql["allpost"] = "select * from posting;";
querysql["allpostbykode"] = "select * from posting where kd_post = $1 ;";
querysql["allsidebar"] = "select * from sidebar;";
querysql["sidebarlogin"] = "select * from sidebar where id = $1 ;";
querysql["sidebaritem"] = "select * from sidebar where id in($1, $2);";

export default querysql;
