
#include <iostream>
#include <fstream>
#include <vector>
#include <iomanip>
#include <cstdlib>

using namespace std;

class Credential {
public:
    string username;
    string password;

    Credential(const string& uname, const string& pwd) : username(uname), password(pwd) {}

    friend ostream& operator<<(ostream& os, const Credential& credential) {
        os << setw(20) << left << credential.username << " " << credential.password;
        return os;
    }
};

class PasswordManager {
private:
    vector<Credential> credentials; //vector of type object using aggregation
    string filename = "passwords.txt";

public:
    PasswordManager() {
        readDataFromFile();
    }

    ~PasswordManager() {
        writeDataToFile();
    }

    void addCredential(const string& username, const string& password) {
        credentials.emplace_back(username, password);  // write data at end of vector with more arguement thus better than push back
        cout << "Credential added successfully.\n";
    }

    void displayCredentials() {
        if (credentials.empty()) {
            cout << "No credentials stored.\n";
            return;
        }

        cout << setw(20) << left << "Username" << "Password\n";
        cout << string(40, '-') << endl;

        for (const auto& credential : credentials) { //auto gets data type automatically.
            cout << credential << endl;
        }
    }

private:
    void readDataFromFile() {
        ifstream file(filename);
        if (file.is_open()) {
            string uname, pwd;
            while (file >> uname >> pwd) {
                credentials.emplace_back(uname, pwd);
            }
            file.close();
        }
    }

    void writeDataToFile() const {
        ofstream file(filename);
        if (file.is_open()) {
            for (const auto& credential : credentials) { //auto gets data type automatically.
                file << credential.username << " " << credential.password << "\n";
            }
            file.close();
        }
    }
};
void encryptToFile(const string& inputFile, const string& outputFile) {
    // Open input and output files
    ifstream inFile(inputFile);
    ofstream outFile(outputFile);

    // Check if files are opened successfully
    if (!inFile || !outFile) {
        cerr << "Error opening files.\n";
        return;
    }

    char ch;
    // Read input file character by character
    while (inFile.get(ch)) {
        // Get ASCII code of the character
        int asciiCode = static_cast<int>(ch);
        // Write ASCII code to output file
        outFile << asciiCode << " ";
    }

    // Close input and output files
    inFile.close();
    outFile.close();

    // Print success message
    cout << "Encryption completed and saved to " << outputFile << endl;
}

void decryptToFile(const string& inputFile, const string& outputFile) {
    ifstream inFile(inputFile);
    ofstream outFile(outputFile);

    if (!inFile || !outFile) {
        cerr << "Error opening files.\n";
        return;
    }

    string asciiCode;
    while (inFile >> asciiCode) {
        try {
            int code = stoi(asciiCode);
            char ch = static_cast<char>(code);
            outFile << ch;
        } catch (const exception& e) {
            cerr << "Error decoding ASCII code: " << e.what() << endl;
            return;
        }
    }

    cout << "Decryption completed and saved to " << outputFile << endl;

    inFile.close();
    outFile.close();
}

int main() {
    const string password= "passwords.txt";
    const string encryptedFileName = "encrypted.txt";


    
    PasswordManager passwordManager;

    int i=0;
    while (i==0) {
        cout << "\nPassword Manager Menu:\n";
        cout << "1. Add Credential\n";
        cout << "2. Display Credentials\n";
        cout << "3. Exit\n";
        cout << "Enter your choice: ";

        int choice;
        cin >> choice;

        switch (choice) {
            case 1: {
                string username, password;
                cout << "Enter Username: ";
                cin >> username;
                cout << "Enter Password: ";
                cin >> password;

                passwordManager.addCredential(username, password);
                break;
            }
            case 2:
                passwordManager.displayCredentials();
                break;
            case 3:
                cout << "Exiting...\n";
                i=1;
                break;
            default:
                cout << "Invalid choice. Please enter a valid option.\n";
        }
    }

    // Encrypt the data from passwords.txt and save to encrypted.txt
    encryptToFile(password, encryptedFileName);

    // Decrypt the data from encrypted.txt and save to passwords.txt
    decryptToFile(encryptedFileName, password);


    return 0;
}


// ANUVANSH STUDENT MANAGER 
/*
#include <iostream>
#include <fstream>
#include <vector>

class Student {
public:
    std::string name;
    int rollNumber;
    double cgpa;

    Student(const std::string& n, int roll, double cg) : name(n), rollNumber(roll), cgpa(cg) {}

    friend std::ostream& operator<<(std::ostream& os, const Student& student) {
        os << "Name: " << student.name << "\nRoll Number: " << student.rollNumber << "\nCGPA: " << student.cgpa << "\n";
        return os;
    }
};

class Company {
public:
    std::string name;
    int vacancy;

    Company(const std::string& n, int vac) : name(n), vacancy(vac) {}

    friend std::ostream& operator<<(std::ostream& os, const Company& company) {
        os << "Company Name: " << company.name << "\nVacancy: " << company.vacancy << "\n";
        return os;
    }
};

class PlacementSystem {
private:
    std::vector<Student> students;
    std::vector<Company> companies;

public:
    void addStudent(const Student& student) {
        students.push_back(student);
    }

    void addCompany(const Company& company) {
        companies.push_back(company);
    }

    void displayStudents() const {
        if (students.empty()) {
            std::cout << "No student details available.\n";
            return;
        }

        for (const auto& student : students) {
            std::cout << student << std::endl;
        }
    }

    void displayCompanies() const {
        if (companies.empty()) {
            std::cout << "No company details available.\n";
            return;
        }

        for (const auto& company : companies) {
            std::cout << company << std::endl;
        }
    }

    void saveToFile(const std::string& filename) const {
        std::ofstream file(filename);
        if (file.is_open()) {
            for (const auto& student : students) {
                file << "Student\n" << student.name << "\n" << student.rollNumber << "\n" << student.cgpa << "\n";
            }
            for (const auto& company : companies) {
                file << "Company\n" << company.name << "\n" << company.vacancy << "\n";
            }
            file.close();
            std::cout << "Details saved to " << filename << std::endl;
        } else {
            std::cerr << "Error opening file for saving.\n";
        }
    }
};

int main() {
    PlacementSystem placementSystem;

    // Adding sample data
    placementSystem.addStudent(Student("Alice", 101, 8.5));
    placementSystem.addStudent(Student("Bob", 102, 7.8));

    placementSystem.addCompany(Company("ABC Corp", 5));
    placementSystem.addCompany(Company("XYZ Ltd", 8));

    // Displaying and saving to a file
    placementSystem.displayStudents();
    placementSystem.displayCompanies();
    placementSystem.saveToFile("placement_details.txt");

    return 0;
}

*/