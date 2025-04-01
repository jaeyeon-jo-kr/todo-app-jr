package jaeyeon.todoapi.service.pdf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import jaeyeon.todoapi.domain.PostStatistic;
import jaeyeon.todoapi.repository.PostStatisticsRepository;

@Service
public class PostStaticService {
    @Autowired
    private PostStatisticsRepository postStatisticsRepository;

    public String[] getHeader() {
        return new String[] { "userId", "month", "postCount" };
    }

    public String[][] getTableContent() {
        List<PostStatistic> postStatistics = postStatisticsRepository.getPostCountByMonth();
        return postStatistics.stream()
                .map(stat -> new String[] { String.valueOf(stat.userId()), String.valueOf(stat.month()),
                        String.valueOf(stat.postCount()) })
                .toArray(String[][]::new);
    }

    public void drawTableRows(PDPageContentStream contentStream, float margin, float yStart, float rowHeight,
            float tableWidth, String[][] content) throws IOException {
        // Draw table rows
        float y = yStart;
        for (int i = 0; i <= content.length + 1; i++) { // +1 for bottom line //+1 for header
            contentStream.moveTo(margin, y);
            contentStream.lineTo(margin + tableWidth, y);
            contentStream.stroke();
            y -= rowHeight;
        }
    }

    public void drawTableColumns(PDPageContentStream contentStream, float margin, float yStart, float rowHeight,
            float tableWidth, float colWidth, float cellMargin, String[][] content) throws IOException {
        // Draw table columns
        float x = margin;
        for (int i = 0; i <= 3; i++) { // 3 columns + 1 for right edge
            contentStream.moveTo(x, yStart);
            contentStream.lineTo(x, yStart - ((content.length + 1) * rowHeight));
            contentStream.stroke();
            x += colWidth;
        }
    }

    public void addContentToTable(PDPageContentStream contentStream, float margin, float yStart, float rowHeight,
            float tableWidth, float colWidth, float cellMargin, String[] header, String[][] content)
            throws IOException {
        // Add text to the table
        float textX = margin + cellMargin;
        float textY = yStart - 15; // Adjust for text baseline
        for (String cell : header) {
            contentStream.beginText();
            contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 11f);
            contentStream.newLineAtOffset(textX, textY);
            contentStream.showText(cell);
            contentStream.endText();
            textX += colWidth;
        }
        textX = margin + cellMargin;
        textY -= rowHeight;
        for (String[] row : content) {
            for (String cell : row) {
                contentStream.beginText();
                contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 12f);
                contentStream.newLineAtOffset(textX, textY);
                contentStream.showText(cell);
                contentStream.endText();
                textX += colWidth;
            }
            textX = margin + cellMargin;
            textY -= rowHeight;
        }
    }

    public void createPdf() {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                float margin = 50;
                float yStart = 700; // Starting y position
                float rowHeight = 25;
                float tableWidth = page.getMediaBox().getWidth() - 2 * margin;
                float colWidth = tableWidth / 3; // 3 columns
                float cellMargin = 5;

                // Sample table data
                String[] header = getHeader();
                String[][] content = getTableContent();

                // Draw table columns
                drawTableRows(contentStream, margin, yStart, rowHeight, tableWidth, content);

                drawTableColumns(contentStream, margin, yStart, rowHeight, tableWidth, colWidth, cellMargin, content);

                // Add text to the table
                addContentToTable(contentStream, margin, yStart, rowHeight, tableWidth, colWidth, cellMargin, header,
                        content);
            }
            document.addPage(page);
            document.save("postStatistics.pdf");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
