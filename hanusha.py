from flask import Flask, jsonify,render_template, request,redirect, url_for
from flask_cors import CORS
import cx_Oracle
import random
import string

app = Flask(__name__)
CORS(app) 
data=''

@app.route('/api',methods=['POST'])
def api():
    data = request.get_json()
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute(data)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return (data)

@app.route('/login',methods=['POST'])
def login():
    inp = request.get_json()
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute("SELECT PASSWORD FROM USER_DATA WHERE USER_ID='"+inp['USER_ID']+"'")
    data = cursor.fetchall()
    warn=False
    if(data[0][0]==inp['PASSWORD']):
        warn=True
    cursor.close()
    connection.close()
    return jsonify(warn)

@app.route('/signup',methods=['POST'])
def signup():
    inp = request.get_json()
    print(inp)
    warn=-1
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute('SELECT USER_ID FROM USER_DATA')
    users = cursor.fetchall()
    print("----------------",users)
    if(inp['Pswd1']==inp['Pswd2'] and ((inp['ID'],) not in users)):
        cursor.execute("INSERT INTO USER_DATA (USER_ID, USER_NAME, PASSWORD, EMAIL, MOBILE_NO, PROFESSION) VALUES (:1, :2, :3, :4, :5, :6)",(inp['ID'], inp['Name'], inp['Pswd1'], inp['Email'], inp['Phone'], inp['Proff']))
        connection.commit();
        warn=0
    elif(inp['Pswd1']!=inp['Pswd2'] and ((inp['ID'],) not in users)):
        warn=1
    elif(inp['Pswd1']==inp['Pswd2'] and ((inp['ID'],) in users)):
        warn=2
    else:
        warn=3
    cursor.close()
    connection.close()
    print("**",warn)
    return jsonify(warn)

def generate_transaction_id(length=16):
    characters = string.ascii_letters + string.digits  # Alphanumeric characters
    transaction_id = ''.join(random.choice(characters) for _ in range(length))
    return transaction_id

@app.route('/income',methods=['POST'])
def insert_income():
    data = request.get_json()
    print("-------------------",data)
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    t_id=generate_transaction_id()
    query="INSERT INTO DEFAULT_INCOME VALUES ('"+t_id+"','"+data['user_id']+"',CURRENT_TIMESTAMP(3),'"+data['title']+"','"+data['description']+"',SYSDATE+"+str(data['counter'])+","+str(data['amount'])+",'"+data['account']+"','"+data['category']+"','',CURRENT_TIMESTAMP(3))"
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify('Income Recorded with Transaction ID '+t_id);

@app.route('/expense',methods=['POST'])
def insert_expense():
    data = request.get_json()
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    t_id=generate_transaction_id()
    query="INSERT INTO DEFAULT_EXPENSE VALUES ('"+t_id+"','"+data['user_id']+"',CURRENT_TIMESTAMP(3),'"+data['title']+"','"+data['description']+"',SYSDATE+"+str(data['counter'])+","+str(data['amount'])+",'"+data['account']+"','"+data['category']+"','"+data['sent_to']+"',CURRENT_TIMESTAMP(3))"
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify('Income Recorded with Transaction ID '+t_id);

if __name__ == '__main__':
    app.run(debug=True,port=5000)