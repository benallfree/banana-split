import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { type Asset } from '../utils/pdfGenerator'

interface PDFTemplateProps {
  partyAName: string
  partyBName: string
  assets: Asset[]
  partyATotal: number
  partyBTotal: number
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    width: '50%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  signature: {
    marginTop: 30,
  },
  signatureLine: {
    marginTop: 5,
  },
})

export default function PDFTemplate({ partyAName, partyBName, assets, partyATotal, partyBTotal }: PDFTemplateProps) {
  const today = new Date()
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Community Property Division Agreement</Text>

        <View style={styles.paragraph}>
          <Text>
            This Community Property Division Agreement (the "Agreement") is made and entered into on this{' '}
            {today.getDate()} day of {today.toLocaleString('default', { month: 'long' })}, {today.getFullYear()}, by and
            between:
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>{partyAName || 'Party A'}, residing at [Party A Address] ("Party A"), and</Text>
          <Text>{partyBName || 'Party B'}, residing at [Party B Address] ("Party B").</Text>
        </View>

        <View style={styles.paragraph}>
          <Text>WHEREAS, Party A and Party B are married and are seeking an uncontested divorce;</Text>
          <Text>
            WHEREAS, Party A and Party B have agreed to divide their community property as set forth in this Agreement;
          </Text>
          <Text>
            NOW, THEREFORE, in consideration of the mutual promises and agreements contained herein, the parties agree
            as follows:
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Identification of Community Property</Text>
          <Text style={styles.paragraph}>
            The parties agree that the following assets constitute their community property and are subject to division
            under this Agreement:
          </Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Asset Name</Text>
              <Text style={styles.tableCell}>Value</Text>
            </View>
            {assets.map((asset) => {
              return (
                <View key={asset.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{asset.name}</Text>
                  <Text style={styles.tableCell}>{formatCurrency(asset.value)}</Text>
                </View>
              )
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Division of Community Property</Text>
          <Text style={styles.paragraph}>The parties agree to divide the community property as follows:</Text>

          <View style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>{partyAName || 'Party A'} shall receive the following assets:</Text>
            {assets
              .filter((asset) => asset.allocationType === 'partyA' || asset.partyAPercentage > 0)
              .map((asset) => {
                const allocation = asset.allocationType === 'split' ? `${asset.partyAPercentage}%` : '100%'
                return (
                  <Text key={asset.id}>
                    • {asset.name}: {allocation} ({formatCurrency(asset.value * (asset.partyAPercentage / 100))})
                  </Text>
                )
              })}
            <Text style={{ fontWeight: 'bold' }}>
              Total value allocated to {partyAName || 'Party A'}: {formatCurrency(partyATotal)}
            </Text>
          </View>

          <View style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>{partyBName || 'Party B'} shall receive the following assets:</Text>
            {assets
              .filter((asset) => asset.allocationType === 'partyB' || asset.partyBPercentage > 0)
              .map((asset) => {
                const allocation = asset.allocationType === 'split' ? `${asset.partyBPercentage}%` : '100%'
                return (
                  <Text key={asset.id}>
                    • {asset.name}: {allocation} ({formatCurrency(asset.value * (asset.partyBPercentage / 100))})
                  </Text>
                )
              })}
            <Text style={{ fontWeight: 'bold' }}>
              Total value allocated to {partyBName || 'Party B'}: {formatCurrency(partyBTotal)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Acknowledgment of Voluntary Agreement</Text>
          <Text style={styles.paragraph}>
            Both parties acknowledge that this Agreement is entered into voluntarily and without coercion or undue
            influence. Each party has had the opportunity to seek independent legal advice prior to signing this
            Agreement.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Governing Law</Text>
          <Text style={styles.paragraph}>
            This Agreement shall be governed by and construed in accordance with the laws of the State of [State Name].
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Entire Agreement</Text>
          <Text style={styles.paragraph}>
            This Agreement constitutes the entire understanding between the parties regarding the division of their
            community property and supersedes all prior agreements, whether written or oral.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Signatures</Text>
          <Text style={styles.paragraph}>
            IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.
          </Text>

          <View style={styles.signature}>
            <Text style={{ fontWeight: 'bold' }}>{partyAName || 'Party A'}:</Text>
            <Text style={styles.signatureLine}>Signature: _______________________________</Text>
            <Text style={styles.signatureLine}>Printed Name: {partyAName || 'Party A'}</Text>
            <Text style={styles.signatureLine}>Date: _______________________________</Text>
          </View>

          <View style={styles.signature}>
            <Text style={{ fontWeight: 'bold' }}>{partyBName || 'Party B'}:</Text>
            <Text style={styles.signatureLine}>Signature: _______________________________</Text>
            <Text style={styles.signatureLine}>Printed Name: {partyBName || 'Party B'}</Text>
            <Text style={styles.signatureLine}>Date: _______________________________</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
