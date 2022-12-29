INSERT INTO department (area)
VALUES
    ('Sales'), /* dpt id 1 */
    ('Engineering'), /* dpt id 2 */
    ('Finance'), /* dpt id 3 */
    ('Legal'); /* dpt id 4 */

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 100000, 1), /* role id 1 */
    ('Lead Engineer', 90000, 2), /* role id 2 */
    ('Financial Analyst', 80000, 3), /* role id 3 */
    ('Accountant', 70000, 3), /* role id 4 */
    ('Lawyer', 70000, 4); /* role id 5 */

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Doe', 1, -1), /* employee id 1 = manager id 1 */
    ('John', 'Galt', 2, -1), /* employee id 2 = manager id 2 */
    ('Robert', 'Olmstead', 3, 1),
    ('Sebastian', 'Marsh', 4, 1),
    ('Gill', 'Nates', 3, 1),
    ('Karen', 'Sanz', 3, 2),
    ('Gordon', 'Nash', 2, 2),
    ('Barney', 'Roberts', 5, 2),
    ('Mary', 'Nett', 1, 2)