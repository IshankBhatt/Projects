package com.example.tictactoe;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    private Button[][] buttons = new Button[3][3];
    private int roundCount;
    private boolean player1turn = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        for(int i=0;i<3;i++){
            for(int j=0;j<3;j++) {
                String buttonid = "button_" + i + j;
                int resId = getResources().getIdentifier(buttonid,"id",getPackageName());
                buttons[i][j] = (Button) findViewById(resId);
                buttons[i][j].setOnClickListener(this);
            }
        }
        Button buttonReset = (Button)findViewById(R.id.reset);
        buttonReset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                resetBoard();
                enablebuttons();
            }
        });
    }

    @Override
    public void onClick(View v) {
        if(!((Button) v).getText().toString().equals("")){
            return;
        }
        else{
            if(player1turn){
                ((Button) v ).setText("X");
            }
            else{
                ((Button) v).setText("O");

            }
            roundCount++;
            if(Win()) {
                    if (player1turn) {
                        Toast.makeText(this, "X won", Toast.LENGTH_LONG).show();
                        //resetBoard();
                    }
                    else {

                        Toast.makeText(this, "O won", Toast.LENGTH_LONG).show();
                        //resetBoard();
                    }
                }
                else if(roundCount==9) {
                    Toast.makeText(this, "Match Drawn", Toast.LENGTH_LONG).show();
                    //resetBoard();
                }
                else
                    player1turn = !player1turn;
            }
    }

    private boolean Win(){
        String[][] field = new String[3][3];
        for(int i=0;i<3;i++){
            for (int j=0;j<3;j++)
                field[i][j] = buttons[i][j].getText().toString();
        }
        for(int i=0;i<3;i++){
            if(field[i][0].equals(field[i][1])
            &&field[i][0].equals(field[i][2])&&!field[i][0].equals("")){
                disableButtons();
                return  true;
            }
        }
        for(int i=0;i<3;i++){
            if(field[0][i].equals(field[1][i])
                    &&field[0][i].equals(field[2][i])&&!field[0][i].equals("")){
                disableButtons();
                return  true;
            }
        }
        if(field[0][0].equals(field[1][1])
                &&field[0][0].equals(field[2][2])&&!field[0][0].equals("")){
            disableButtons();
            return  true;
        }
        if(field[0][2].equals(field[1][1])
                &&field[0][2].equals(field[2][0])&&!field[0][2].equals("")){
            disableButtons();
            return  true;
        }
        return false;
    }
    private void resetBoard(){
        for(int i=0;i<3;i++){
            for(int j = 0;j<3;j++)
                buttons[i][j].setText("");
        }
    }
    private void disableButtons(){
        for(int i=0;i<3;i++){
            for(int j = 0;j<3;j++)
                buttons[i][j].setEnabled(false);
        }
    }
    private void enablebuttons(){
        for(int i=0;i<3;i++){
            for(int j = 0;j<3;j++)
                buttons[i][j].setEnabled(true);
        }
    }
}