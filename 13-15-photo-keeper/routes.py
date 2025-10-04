from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
import uuid
from werkzeug.utils import secure_filename

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'photokeeper.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- Моделі баз даних ---

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    photo_name = db.Column(db.String(255), nullable=False)
    likes_number = db.Column(db.Integer, default=0, nullable=False)    
    description = db.Column(db.String(255), nullable=True)
    effect = db.Column(db.String(100), nullable=False)
    hashtags = db.Column(db.String(255), nullable=True)

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    photo_src = db.Column(db.String(255), nullable=False)
    comment_text = db.Column(db.String(255), nullable=False)


def init_db():
    with app.app_context():
        db.create_all()
        print(" * База даних і таблиці створені!")

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload/photo', methods=['POST'])
def upload_photo():
    file = request.files.get('file')
    
    if not file:
        return "Файл не вибрано", 400

    ext = file.filename.rsplit(".", 1)[-1].lower() 
    filename = f"{uuid.uuid4()}.{ext}"
    filename = secure_filename(filename)

    save_path = os.path.join(basedir, 'static', 'img', 'photos', filename)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    file.save(save_path)

    description = request.form.get('description', '')    
    hashtags = request.form.get('hashtags', '')
    effect = request.form.get('effect', 'none')
    effect_level = request.form.get('effectLevel', '0')
    effect_full = f"{effect}({effect_level}%)" if effect != 'none' else 'none'

    photo = Photo(
        photo_name=filename,
        description=description,
        hashtags=hashtags,
        effect=effect_full
    )
    db.session.add(photo)
    db.session.commit()

    return redirect(url_for('index'))
   


# Запуск сервера
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
