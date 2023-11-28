from PyQt5 import QtCore, QtGui, QtWidgets
from UserSession import UserSession


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(596, 438)
        MainWindow.setStyleSheet("background-color: rgb(231, 231, 231);")
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.LoginButton = QtWidgets.QPushButton(self.centralwidget)
        self.LoginButton.setGeometry(QtCore.QRect(70, 210, 171, 61))
        palette = QtGui.QPalette()
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.WindowText, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Text, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.ButtonText, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Base, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Window, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231, 128))
        brush.setStyle(QtCore.Qt.NoBrush)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.PlaceholderText, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.WindowText, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Text, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.ButtonText, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Base, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Window, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231, 128))
        brush.setStyle(QtCore.Qt.NoBrush)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.PlaceholderText, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.WindowText, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Text, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.ButtonText, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Base, brush)
        brush = QtGui.QBrush(QtGui.QColor(72, 105, 137))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Window, brush)
        brush = QtGui.QBrush(QtGui.QColor(231, 231, 231, 128))
        brush.setStyle(QtCore.Qt.NoBrush)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.PlaceholderText, brush)
        self.LoginButton.setPalette(palette)
        font = QtGui.QFont()
        font.setFamily("Arial Black")
        font.setPointSize(13)
        font.setBold(True)
        font.setWeight(75)
        self.LoginButton.setFont(font)
        self.LoginButton.setAutoFillBackground(False)
        self.LoginButton.setStyleSheet("QPushButton {\n"
"    background-color: rgb(72, 105, 137);\n"
"    border: none;\n"
"    color: rgb(231, 231, 231);\n"
"    border-radius: 10px;\n"
"    border-left: 2px solid rgb(55, 81, 108);\n"
"    border-right: 2px solid rgb(55, 81, 108);\n"
"    border-bottom: 5px solid rgb(55, 81, 108);\n"
"    padding-top: 5px;\n"
"}\n"
"QPushButton:hover {\n"
"    background-color: rgb(80, 116, 155);\n"
"    border-left: 2px solid rgb(55, 81, 108);\n"
"    border-right: 2px solid rgb(55, 81, 108);\n"
"    border-bottom: 5px solid rgb(55, 81, 108);\n"
"}\n"
"QPushButton:pressed {\n"
"    background-color: rgb(40, 58, 77);\n"
"    border-left: 2px solid rgb(55, 81, 108);\n"
"    border-right: 2px solid rgb(55, 81, 108);\n"
"    border-bottom: 5px solid rgb(55, 81, 108);\n"
"    padding-top: -5px;\n"
"    border-bottom: none;\n"
"}\n"
"")
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap("GUI/linkedin-logo.png"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.LoginButton.setIcon(icon)
        self.LoginButton.setObjectName("LoginButton")
        self.Logo = QtWidgets.QLabel(self.centralwidget)
        self.Logo.setGeometry(QtCore.QRect(40, 10, 231, 181))
        self.Logo.setText("")
        self.Logo.setPixmap(QtGui.QPixmap("GUI/talk.png"))
        self.Logo.setScaledContents(True)
        self.Logo.setObjectName("Logo")
        self.Table = QtWidgets.QTableView(self.centralwidget)
        self.Table.setGeometry(QtCore.QRect(310, 10, 261, 401))
        self.Table.setStyleSheet("QTableView{\n"
"    background-color: rgb(72, 105, 137);\n"
"    border: none;\n"
"    color: rgb(231, 231, 231);\n"
"    border-radius: 3px;\n"
"    border-top: 4px solid rgb(55, 81, 108);\n"
"    border-left: 4px solid rgb(55, 81, 108);\n"
"    border-right: 4px solid rgb(55, 81, 108);\n"
"    border-bottom: 4px solid rgb(55, 81, 108);\n"
"}")
        self.Table.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.Table.setFrameShadow(QtWidgets.QFrame.Raised)
        self.Table.setMidLineWidth(1)
        self.Table.setGridStyle(QtCore.Qt.DashLine)
        self.Table.setSortingEnabled(False)
        self.Table.setObjectName("Table")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 596, 24))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

        #On click event for login button
        self.LoginButton.clicked.connect(self.login_clicked)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "PoliTalk"))
        self.LoginButton.setText(_translate("MainWindow", "Log into LinkedIn"))

    def login_clicked(self) -> None:
        self.LoginButton.setText("Logging in...")
        self.LoginButton.setEnabled(False)
        self.LoginButton.repaint()
        
        # Create a user session
        user_session = UserSession()
        successfully_logged = user_session.login()
        print(successfully_logged)
        user_session.quit()

        self.LoginButton.setText("Log into LinkedIn")
        self.LoginButton.setEnabled(True)


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())

