//
//  CatalogueViewController.swift
//  catalogue-tvos
//
//  Created by DevLabs BG on 3/31/17.
//  Copyright © 2017 Devlabs. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

  // MARK: - Singleton properties
  
  // MARK: - Static properties
  
  // MARK: - Public properties
  
  // MARK: - Public methods
  
  // MARK: - Initialize/Livecycle methods
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    tableView = UITableView(frame: CGRect.zero, style: .plain)
    tableView.register(CatalogueTableViewCell.self, forCellReuseIdentifier: tableCellIdentifier)
    
    images = []
  }
  
  // MARK: - Override methods
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
  }
  
  override func viewWillLayoutSubviews() {
    super.viewWillLayoutSubviews()
    
    tableView.frame = view.bounds
  }
  
  // MARK: - Private properties
  
  /// property to represent the table view on the UI
  fileprivate var tableView: UITableView! {
    didSet {
      tableView.delegate = self
      tableView.dataSource = self
      tableView.tableFooterView = UIView(frame: CGRect.zero)
      tableView.backgroundColor = .black
      view.addSubview(tableView)
    }
  }
  
  /// private property to store the table row's height
  fileprivate let rowHeight = UIScreen.main.bounds.height * 0.2
  
  /// private property to store the table cell's identifier
  fileprivate var tableCellIdentifier = "CATALOG_TABLE_CELL_ID"
  
  fileprivate let season1Images = [UIImage](repeating: UIImage(named: "arrow-season-1")!, count: 9)
  fileprivate let season2Images = [UIImage](repeating: UIImage(named: "arrow-season-2")!, count: 9)
  fileprivate let season3Images = [UIImage](repeating: UIImage(named: "arrow-season-3")!, count: 9)
  fileprivate let season4Images = [UIImage](repeating: UIImage(named: "arrow-season-4")!, count: 9)
  fileprivate let season5Images = [UIImage](repeating: UIImage(named: "arrow-season-5")!, count: 9)
  fileprivate var images: [[UIImage]]! {
    didSet {
      images.append(season1Images)
      images.append(season2Images)
      images.append(season3Images)
      images.append(season4Images)
      images.append(season5Images)
    }
  }
  
  // MARK: - Private methods
}

// MARK: - UITableViewDelegate's methods
extension ViewController: UITableViewDelegate {
  
  func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return rowHeight
  }
  
  func tableView(_ tableView: UITableView, canFocusRowAt indexPath: IndexPath) -> Bool {
    return false
  }
  
  func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
    return (rowHeight) * 0.2
  }
  
  func numberOfSections(in tableView: UITableView) -> Int {
    return 5
  }
}

// MARK: - UITableViewDataSource's methods
extension ViewController: UITableViewDataSource {
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return 1
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    if let _cell = tableView.dequeueReusableCell(withIdentifier: tableCellIdentifier, for: indexPath) as? CatalogueTableViewCell {
      _cell.titles = [String](repeating: "Arrow S0\(indexPath.section + 1)E0", count: 9)
      _cell.images = images[indexPath.section]
      _cell.delegate = self
      return _cell
    } else {
      return UITableViewCell()
    }
  }
  
  func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
    let headerView = UIView()
    let titleLabel = UILabel()
    titleLabel.textColor = .white
    titleLabel.textAlignment = .center
    titleLabel.font = titleLabel.font.withSize(22)
    titleLabel.frame = CGRect(x: 0, y: 0, width: view.bounds.width, height: (rowHeight) * 0.2).integral
    titleLabel.text = "Season \(section + 1)"
    headerView.addSubview(titleLabel)
    return headerView
  }
}

// MARK: - CatalogueTableViewCellDelegate methods
extension ViewController: CatalogueTableViewCellDelegate {
  func didSelectItem(inCell cell: CatalogueCollectionViewCell) {
    performSegue(withIdentifier: "ShowEpisodeDetails", sender: nil)
  }
}
