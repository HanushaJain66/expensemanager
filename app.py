from flask import Flask, jsonify,render_template, request,redirect, url_for
from flask_cors import CORS
from flask_mail import Mail, Message
import cx_Oracle
import random
import string

app = Flask(__name__)
CORS(app) 
data=''

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587  # Use the appropriate port for your email provider
app.config['MAIL_USE_TLS'] = True  # Use TLS for security
app.config['MAIL_USE_SSL'] = False  # Don't use SSL if you're using TLS
app.config['MAIL_USERNAME'] = 'u22cs035@coed.svnit.ac.in'
app.config['MAIL_PASSWORD'] = 'medphquozgeiijlt'

mail = Mail(app)

def send_email(subject, recipients, text_body, html_body=None):
    msg = Message(subject, sender='u22cs035@coed.svnit.ac.in', recipients=recipients)
    msg.body = text_body
    if html_body:
        msg.html = html_body
    mail.send(msg)

@app.route('/send_emails')
def send_emails(data):
    otp=generate_otp();
    recipients = [data]
    subject = 'Your OTP is '+otp
    text_body = 'This is a test email from Flask-Mail.'
    html_body = '<p>To register into SmartExpenseManager use this OTP:<br><h1>'+otp+'</h1></p>'
    
    send_email(subject, recipients, text_body, html_body)
    
    return jsonify(otp)


@app.route('/otp',methods=['POST'])
def otp():
    data = request.get_json()
    return (send_emails(data))

@app.route('/userId',methods=['POST'])
def userId():
    data = request.get_json()
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute("SELECT USER_ID FROM USER_DATA WHERE USER_ID='"+data+"'")
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    print(data)
    if len(data)>0:
        return jsonify(0)
    else:
        return jsonify(1)

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

@app.route('/setAc',methods=['POST'])
def setAc():
    data = request.get_json()
    print("-----------",data)
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute(data)
    cursor.close()
    connection.close()
    return jsonify('Default Account Set.')

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
    warn=-1
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute('SELECT USER_ID FROM USER_DATA')
    users = cursor.fetchall()
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
    return jsonify(warn)

def generate_otp(length=6):
    number = string.digits  # Alphanumeric characters
    transaction_id = ''.join(random.choice(number) for _ in range(length))
    return transaction_id

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

@app.route('/account',methods=['POST'])
def insert_account():
    data = request.get_json()
    print("**************",data)
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    t_id=generate_transaction_id()
    q="SELECT COUNT(ACCOUNT_ID) FROM DEFAULT_ACCOUNT WHERE USER_ID='"+data['user_id']+"'"
    cursor.execute(q)
    n= cursor.fetchall()
    query="INSERT INTO DEFAULT_ACCOUNT VALUES ('"+data['user_id']+"','A"+str(int(n[0][0])+1)+"','"+data['name']+"','"+data['type']+"','"+data['description']+"',"+data['opening']+","+data['balance']+")"
    print("===========",query)
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify('Account Added with Account ID '+'A'+str(int(n[0][0])+1));

@app.route('/monthly',methods=['POST'])
def monthly():
    data = request.get_json()
    connection = cx_Oracle.connect('c##gurudev/gurudev@localhost:1521/xe')
    cursor = connection.cursor()
    cursor.execute(data)
    data = cursor.fetchall()
    ans=dict({})
    for i in data:
        if(ans.get(i[3])!=None):
            ans[i[3]].append(i)
        else :
            ans[i[3]]=[i]
    cursor.close()
    connection.close()
    print(ans)
    return (ans)

if __name__ == '__main__':
    app.run(debug=True)
    