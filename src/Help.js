import React, { Component } from 'react';
import './App.css';
import image from './M1.png';
import image1 from './M2.png';
import image2 from './M3.png';
import image3 from './M4.png';

const styles = {
	width: 300, height: 120
};

class Help extends Component {

	render() {
	    return (
	      	<div className="Help">
	        <p>In Bioinformatics, a sequence alignment is a way of arranging the sequences of DNA, RNA, or protein to identify regions of similarity that may be a consequence of functional, structural, or evolutionary relationships between the sequences.</p>
	        <p>Our project aims to design and build a user-friendly interactive web application which facilitates in demonstrating the concept of sequence alignment. Global sequence alignment is done using the Needleman-Wunsch algorithm and local sequence alignment is done using Smith-Waterman algorithm.</p>
	        <p>This application teaches the user about the various steps involved in the process of sequence alignment. It also allows the user to provide answers and inputs. Thus, the user will get a more hands-on learning experience making the overall teaching process more interesting.</p>
	      	<br />
	      	<h3 align='center'>GLOBAL ALIGNMENT USING NEEDLEMAN-WUNSCH ALGORITHM</h3><br />
	      	The Needleman–Wunsch algorithm is used to align protein or nucleotide sequences. It was one of the first applications of dynamic programming to compare biological sequences.
	      	<br /><br />
	      	The algorithm was developed by Saul B. Needleman and Christian D. Wunsch. The algorithm essentially divides a large problem into a series of smaller problems and uses the solutions to the smaller problems to reconstruct a solution to the larger problem. It is also sometimes referred to as the optimal matching algorithm and the global alignment technique.
	      	<br /><br />
	      	The Needleman–Wunsch algorithm is widely used for optimal global alignment, particularly when the quality of the global alignment is of the utmost importance.
      		<br /><br />
      		The following are the steps of the algorithm :
      			<ul>
      				<li>Create a matrix 'a' with M + 1 columns and N + 1 rows where M and N correspond to the size of the sequences to be aligned.</li>
      				<br />
      				<li>Initialize another matrix of the same size as 'a', which will contain the direction of the arrows of the alignment. This is going to be used at the traceback stage to give us the alignment. Call this matrix ptr.</li>
      				<br />
      				<li>Initialize the variables match, mismatch, and gap which give the score for each of them respectively. Presently, you can take match = 1, mismatch = -1, gap = -1.</li>
					<br />
					<li>Fill the first row and column with the column or row number times the mismatch score. If you print the matrix after completing this step, it will look like this.
					</li>
					<br />
					<img src={image} alt="Matrix" style={styles} />
	      			<br />
	      			<br />
	      			<li>The following pseudocode is used for filling the matrix :
	      				<br />
	      				<br />
						for i = 1 to rows:<br />
					    &nbsp;for j =1 to cols:<br />
					    &nbsp;	&nbsp;if i<sup>th</sup> character in seqA == j<sup>th</sup> character in seqB:<br />
					    &nbsp;	&nbsp;	&nbsp;score=match<br />
					    &nbsp;	&nbsp;else<br />
					    &nbsp;	&nbsp;	&nbsp;score = mismatch<br />
					    &nbsp;	&nbsp;# Now we have 3 choices<br />
						&nbsp;	&nbsp;choice1=a[i-1,j-1]+score&nbsp;&nbsp;&nbsp;# If characters are aligned<br />
						&nbsp;	&nbsp;choice2=a[i-1,j] + gap&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqB<br />
						&nbsp;	&nbsp;choice3=a[i,j-1] + gap&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqA<br />
						&nbsp;	&nbsp;Let a[i,j] be max(choice1,choice2,choice3)<br />
						&nbsp;	&nbsp;if a[i,j] is choice1:<br />
						&nbsp;	&nbsp;	&nbsp;let ptr[i,j] be 0&nbsp;	&nbsp;	&nbsp;	&nbsp;# Chars i and j aligned<br />
					   	&nbsp;	&nbsp;else if a[i,j] is choice2:<br />
					    &nbsp;	&nbsp;	&nbsp;let ptr[i,j] be 1&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqB<br />
					    &nbsp;	&nbsp;else <br />
					    &nbsp;	&nbsp;	&nbsp;let ptr[i,j] be -1&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqA
					</li>
					<br />
					<li>
						This completes the matrix filling step. If you print the matrix after this stage, it will look like this.
					</li>
					<br />
					<img src={image1} alt="Matrix" style={styles} />
					<br />
					<br />
					<li>Traceback from the last element in the matrix to obtain the alignments. The following is the pseudocode for traceback :
						<br />
						<br />
						i=length of seq A<br />
						j=length of seq B<br />
						while(i>0 or j>0):<br />
						&nbsp;if ptr[i,j]==0:<br />
						&nbsp;	&nbsp;add i<sup>th</sup> character of seqA to alnseqA<br />
						&nbsp;	&nbsp;add j<sup>th</sup> character of seqB to alnseqB<br />
						&nbsp;	&nbsp;decrement i by 1<br />
						&nbsp;	&nbsp;decrement j by 1<br />
						&nbsp;elif ptr[i,j]==1:<br />
						&nbsp;	&nbsp;add i<sup>th</sup> character of seqA to alnseqA<br />
						&nbsp;	&nbsp;add '.' to alnseqB<br />
						&nbsp;	&nbsp;decrement i by 1<br />
						&nbsp;else:<br />
						&nbsp;	&nbsp;add '.' to alnseqA<br />
						&nbsp;	&nbsp;add j<sup>th</sup> character of seqB to alnseqB<br />
						&nbsp;	&nbsp;decrement j by 1
					</li>
					<br />
					<li>Print seqA and seqB in reverse to see the alignment.<br />
						For our example : AGTA<br />
						&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;&nbsp;A.TA<br/></li>
					<br />
					<li>Score is given by the integer at a[M][N].<br />
						For our example : Score =  2
					</li>
						
	      		</ul>
	      	<br />
	      	<h3 align='center'>LOCAL ALIGNMENT USING SMITH-WATERMAN ALGORITHM</h3><br />
	      	The Smith–Waterman algorithm performs local sequence alignment; that is, for determining similar regions between two strings of nucleic acid sequences or protein sequences. Instead of looking at the entire sequence, the Smith–Waterman algorithm compares segments of all possible lengths and optimizes the similarity measure.
	      	<br /><br />
	      	The algorithm was first proposed by Temple F. Smith and Michael S. Waterman in 1981. Like the Needleman–Wunsch algorithm, of which it is a variation, Smith–Waterman is a dynamic programming algorithm. As such, it has the desirable property that it is guaranteed to find the optimal local alignment with respect to the scoring system being used (which includes the substitution matrix and the gap-scoring scheme).
	      	<br /><br />
	       	The main difference to the Needleman–Wunsch algorithm is that negative scoring matrix cells are set to zero, which renders the (thus positively scoring) local alignments visible. Traceback procedure starts at the highest scoring matrix cell and proceeds until a cell with score zero is encountered, yielding the highest scoring local alignment.
	      	<br /><br />
	      	The following are the steps of the algorithm :
      			<ul>
      				<li>Create a matrix 'a' with M + 1 columns and N + 1 rows where M and N correspond to the size of the sequences to be aligned.</li>
      				<br />
      				<li>Initialize another matrix of the same size as 'a', which will contain the direction of the arrows of the alignment. This is going to be used at the traceback stage to give us the alignment. Call this matrix ptr.</li>
      				<br />
      				<li>Initialize the variables match, mismatch, and gap which give the score for each of them respectively. Presently, you can take match = 1, mismatch = -1, gap = -1.</li>
					<br />
					<li>Fill the first row and column with 0. If you print the matrix after completing this step, it will look like this.
					</li>
					<br />
					<img src={image2} alt="Matrix" style={styles} />
	      			<br />
	      			<br />
	      			<li>The following pseudocode is used for filling the matrix :
	      				<br />
	      				<br />
						for i = 1 to rows:<br />
					    &nbsp;for j = 1 to cols:<br />
					    &nbsp;	&nbsp;if i<sup>th</sup> character in seqA == j<sup>th</sup> character in seqB:<br />
					    &nbsp;	&nbsp;	&nbsp;score=match<br />
					    &nbsp;	&nbsp;else<br />
					    &nbsp;	&nbsp;	&nbsp;score = mismatch<br />
					    &nbsp;	&nbsp;# Now we have 4 choices<br />
						&nbsp;	&nbsp;choice1=a[i-1,j-1]+score&nbsp;&nbsp;&nbsp;# If characters are aligned<br />
						&nbsp;	&nbsp;choice2=a[i-1,j] + gap&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqB<br />
						&nbsp;	&nbsp;choice3=a[i,j-1] + gap&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqA<br />
						&nbsp;	&nbsp;choice4=0&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;# Zero<br />
						&nbsp;	&nbsp;Let a[i,j] be max(choice1,choice2,choice3,choice4)<br />
						&nbsp;	&nbsp;if a[i,j] is choice1:<br />
						&nbsp;	&nbsp;	&nbsp;let ptr[i,j] be 0&nbsp;	&nbsp;	&nbsp;	&nbsp;# Chars i and j aligned<br />
					   	&nbsp;	&nbsp;else if a[i,j] is choice2:<br />
					    &nbsp;	&nbsp;	&nbsp;let ptr[i,j] be 1&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqB<br />
					    &nbsp;	&nbsp;else if a[i,j] is choice3:<br />
					    &nbsp;	&nbsp;	&nbsp;let ptr[i,j] be -1&nbsp;	&nbsp;	&nbsp;	&nbsp;# Gap in seqA<br />
					    &nbsp;	&nbsp;else:<br />
					    &nbsp;	&nbsp;	&nbsp;let ptr[i,j] be 2&nbsp;	&nbsp;	&nbsp;	&nbsp;# No similarity uptil now
					</li>
					<br />
					<li>
						This completes the matrix filling step. If you print the matrix after this stage, it will look like this.
					</li>
					<br />
					<img src={image3} alt="Matrix" style={styles} />
					<br />
					<br />
					<li>Traceback from the cell which contains the highest value in the matrix to obtain the alignments. The following is the pseudocode for traceback :
						<br />
						<br />
						i=length of seq A<br />
						j=length of seq B<br />
						while(i>0 or j>0):<br />
						&nbsp;if ptr[i,j]==0:<br />
						&nbsp;	&nbsp;add i<sup>th</sup> character of seqA to alnseqA<br />
						&nbsp;	&nbsp;add j<sup>th</sup> character of seqB to alnseqB<br />
						&nbsp;	&nbsp;decrement i by 1<br />
						&nbsp;	&nbsp;decrement j by 1<br />
						&nbsp;elif ptr[i,j]==1:<br />
						&nbsp;	&nbsp;add i<sup>th</sup> character of seqA to alnseqA<br />
						&nbsp;	&nbsp;add '.' to alnseqB<br />
						&nbsp;	&nbsp;decrement i by 1<br />
						&nbsp;elif pts[i,j]==-1:<br />
						&nbsp;	&nbsp;add '.' to alnseqA<br />
						&nbsp;	&nbsp;add j<sup>th</sup> character of seqB to alnseqB<br />
						&nbsp;	&nbsp;decrement j by 1<br />
						&nbsp;elif:<br />
						&nbsp;	&nbsp;break						
					</li>
					<br />
					<li>Print seqA and seqB to see the alignment.<br />
						For our example : AGTA<br />
						&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;&nbsp;A.TA<br/></li>
					<br />
					<li>Score is given by the maximum value in the matrix.<br />
						For our example : Score =  2</li>
	      		</ul>
	      	<br />
	      	<h3 align='center'>Hope you found this tutorial useful and informative!</h3>
	      	<br />
	      	<br />
	      	</div>
	  	);
	}
}
export default Help;